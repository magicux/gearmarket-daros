const db = require('../config/db');

function normalizeRows(result) {
  if (Array.isArray(result)) return result;
  if (result && Array.isArray(result.rows)) return result.rows;
  return [];
}

async function getFavoritesByUser(userId) {
  const query = `
    SELECT f.id, f.publication_id, p.title, p.price, p.image_url, p.category, p.location
    FROM favorites f
    INNER JOIN publications p ON p.id = f.publication_id
    WHERE f.user_id = $1
    ORDER BY f.id DESC
  `;
  return normalizeRows(await db.query(query, [userId]));
}

async function addFavorite(userId, publicationId) {
  const query = `
    INSERT INTO favorites (user_id, publication_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, publication_id) DO NOTHING
    RETURNING id
  `;
  const rows = normalizeRows(await db.query(query, [userId, publicationId]));
  return rows[0] || null;
}

async function deleteFavorite(userId, publicationId) {
  const query = 'DELETE FROM favorites WHERE user_id = $1 AND publication_id = $2 RETURNING id';
  const rows = normalizeRows(await db.query(query, [userId, publicationId]));
  return rows[0] || null;
}

module.exports = {
  getFavoritesByUser,
  addFavorite,
  deleteFavorite,
};
