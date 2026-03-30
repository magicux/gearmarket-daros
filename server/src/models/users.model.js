const db = require('../config/db');

function normalizeRows(result) {
  if (Array.isArray(result)) return result;
  if (result && Array.isArray(result.rows)) return result.rows;
  return [];
}

async function createUser({ name, email, password }) {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, avatar
  `;
  const rows = normalizeRows(await db.query(query, [name, email, password]));
  return rows[0] || null;
}

async function findUserByEmail(email) {
  const query = `
    SELECT id, name, email, password, avatar
    FROM users
    WHERE email = $1
  `;
  const rows = normalizeRows(await db.query(query, [email]));
  return rows[0] || null;
}

async function findUserById(id) {
  const query = `
    SELECT id, name, email, avatar
    FROM users
    WHERE id = $1
  `;
  const rows = normalizeRows(await db.query(query, [id]));
  return rows[0] || null;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
