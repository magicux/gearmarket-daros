const pool = require('../config/db');

async function getProfileById(id) {
  const query = `
    SELECT id, name, email, avatar, created_at
    FROM users
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
}

module.exports = { getProfileById };
