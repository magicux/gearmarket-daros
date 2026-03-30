const pool = require('../config/db');

async function findUserByEmail(email) {
  const query = 'SELECT id, name, email, password, avatar, created_at FROM users WHERE email = $1';
  const { rows } = await pool.query(query, [email]);
  return rows[0] || null;
}

async function createUser({ name, email, password, avatar = null }) {
  const query = `
    INSERT INTO users (name, email, password, avatar)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, avatar, created_at
  `;
  const { rows } = await pool.query(query, [name, email, password, avatar]);
  return rows[0];
}

module.exports = {
  findUserByEmail,
  createUser,
};
