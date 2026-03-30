const db = require('../config/db');

function normalizeRows(result) {
  if (Array.isArray(result)) return result;
  if (result && Array.isArray(result.rows)) return result.rows;
  return [];
}

const baseSelect = `
  SELECT
    p.id,
    p.title,
    p.description,
    p.price,
    p.image_url,
    p.category,
    p.location,
    p.user_id,
    p.created_at,
    u.name AS seller_name,
    u.email AS seller_email
  FROM publications p
  INNER JOIN users u ON u.id = p.user_id
`;

function mapPublication(row) {
  if (!row) return null;
  return {
    id: Number(row.id),
    title: row.title,
    description: row.description,
    price: Number(row.price),
    image_url: row.image_url,
    category: row.category,
    location: row.location,
    created_at: row.created_at,
    user_id: Number(row.user_id),
    seller: {
      id: Number(row.user_id),
      name: row.seller_name,
      email: row.seller_email,
    },
  };
}

async function getAllPublications() {
  const query = `${baseSelect} ORDER BY p.id DESC`;
  const rows = normalizeRows(await db.query(query));
  return rows.map(mapPublication);
}

async function getPublicationById(id) {
  const query = `${baseSelect} WHERE p.id = $1`;
  const rows = normalizeRows(await db.query(query, [id]));
  return mapPublication(rows[0]);
}

async function createPublication({ title, description, price, image_url, category, location, user_id }) {
  const query = `
    INSERT INTO publications (title, description, price, image_url, category, location, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;
  const rows = normalizeRows(await db.query(query, [title, description, price, image_url, category, location, user_id]));
  return rows[0] || null;
}

async function updatePublication(id, payload) {
  const current = await getPublicationById(id);
  if (!current) return null;

  const next = {
    title: payload.title ?? current.title,
    description: payload.description ?? current.description,
    price: payload.price ?? current.price,
    image_url: payload.image_url ?? current.image_url,
    category: payload.category ?? current.category,
    location: payload.location ?? current.location,
  };

  const query = `
    UPDATE publications
    SET title = $1, description = $2, price = $3, image_url = $4, category = $5, location = $6
    WHERE id = $7
    RETURNING id
  `;
  await db.query(query, [next.title, next.description, next.price, next.image_url, next.category, next.location, id]);
  return getPublicationById(id);
}

async function deletePublication(id) {
  const query = 'DELETE FROM publications WHERE id = $1 RETURNING id';
  const rows = normalizeRows(await db.query(query, [id]));
  return rows[0] || null;
}

module.exports = {
  getAllPublications,
  getPublicationById,
  createPublication,
  updatePublication,
  deletePublication,
};
