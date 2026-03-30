const { Pool } = require('pg');
require('dotenv').config();

let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
  }

  return pool;
}

async function testConnection() {
  try {
    const activePool = await getPool();
    const client = await activePool.connect();
    console.log('Database connected successfully');
    client.release();
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);
  }
}

testConnection();

async function query(text, params = []) {
  return getPool().query(text, params);
}

async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

module.exports = {
  query,
  getPool,
  closePool,
};
