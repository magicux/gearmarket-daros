const db = require('../config/db');

function normalizeRows(result) {
  if (Array.isArray(result)) return result;
  if (result && Array.isArray(result.rows)) return result.rows;
  return [];
}

async function createMessage({ sender_id, receiver_id, publication_id, message }) {
  const query = `
    INSERT INTO messages (sender_id, receiver_id, publication_id, message)
    VALUES ($1, $2, $3, $4)
    RETURNING id, sender_id, receiver_id, publication_id, message, created_at
  `;
  const rows = normalizeRows(await db.query(query, [sender_id, receiver_id, publication_id, message]));
  return rows[0] || null;
}

async function getConversationsByUserId(userId) {
  const query = `
    WITH ranked_messages AS (
      SELECT
        m.id,
        m.message,
        m.created_at,
        m.publication_id,
        p.title AS publication_title,
        p.image_url AS publication_image_url,
        CASE
          WHEN m.sender_id = $1 THEN m.receiver_id
          ELSE m.sender_id
        END AS counterpart_id,
        CASE
          WHEN m.sender_id = $1 THEN receiver.name
          ELSE sender.name
        END AS counterpart_name,
        CASE
          WHEN m.sender_id = $1 THEN receiver.email
          ELSE sender.email
        END AS counterpart_email,
        CASE
          WHEN m.sender_id = $1 THEN 'sent'
          ELSE 'received'
        END AS direction,
        ROW_NUMBER() OVER (
          PARTITION BY m.publication_id,
          LEAST(m.sender_id, m.receiver_id),
          GREATEST(m.sender_id, m.receiver_id)
          ORDER BY m.created_at DESC, m.id DESC
        ) AS rn
      FROM messages m
      INNER JOIN publications p ON p.id = m.publication_id
      INNER JOIN users sender ON sender.id = m.sender_id
      INNER JOIN users receiver ON receiver.id = m.receiver_id
      WHERE m.sender_id = $1 OR m.receiver_id = $1
    )
    SELECT
      id,
      message,
      created_at,
      publication_id,
      publication_title,
      publication_image_url,
      counterpart_id,
      counterpart_name,
      counterpart_email,
      direction
    FROM ranked_messages
    WHERE rn = 1
    ORDER BY created_at DESC, id DESC
  `;

  return normalizeRows(await db.query(query, [userId]));
}

async function getConversationMessages({ userId, publicationId, counterpartId }) {
  const query = `
    SELECT
      m.id,
      m.sender_id,
      m.receiver_id,
      m.message,
      m.created_at,
      m.publication_id,
      p.title AS publication_title,
      p.image_url AS publication_image_url,
      sender.name AS sender_name,
      sender.email AS sender_email,
      receiver.name AS receiver_name,
      receiver.email AS receiver_email
    FROM messages m
    INNER JOIN publications p ON p.id = m.publication_id
    INNER JOIN users sender ON sender.id = m.sender_id
    INNER JOIN users receiver ON receiver.id = m.receiver_id
    WHERE m.publication_id = $1
      AND (
        (m.sender_id = $2 AND m.receiver_id = $3)
        OR
        (m.sender_id = $3 AND m.receiver_id = $2)
      )
    ORDER BY m.created_at ASC, m.id ASC
  `;

  return normalizeRows(await db.query(query, [publicationId, userId, counterpartId]));
}

module.exports = {
  createMessage,
  getConversationsByUserId,
  getConversationMessages,
};
