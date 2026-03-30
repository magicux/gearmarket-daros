process.env.JWT_SECRET = 'test_secret';

jest.mock('../src/config/db', () => ({
  query: jest.fn(),
  closePool: jest.fn(),
}));

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/config/db');

describe('Messages routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/v1/messages debe responder 401 sin token', async () => {
    const response = await request(app)
      .post('/api/v1/messages')
      .send({ receiver_id: 2, publication_id: 1, message: 'Hola, sigue disponible?' });

    expect(response.statusCode).toBe(401);
  });

  test('POST /api/v1/messages debe responder 400 si intenta enviarse mensaje a sí mismo', async () => {
    const token = jwt.sign({ id: 1, email: 'comprador@test.com', name: 'Comprador' }, process.env.JWT_SECRET);

    const response = await request(app)
      .post('/api/v1/messages')
      .set('Authorization', `Bearer ${token}`)
      .send({ receiver_id: 1, publication_id: 3, message: 'Hola' });

    expect(response.statusCode).toBe(400);
  });

  test('POST /api/v1/messages debe responder 201 con token válido', async () => {
    const token = jwt.sign({ id: 1, email: 'comprador@test.com', name: 'Comprador' }, process.env.JWT_SECRET);
    db.query.mockResolvedValueOnce({ rows: [{ id: 15, sender_id: 1, receiver_id: 2, publication_id: 3, message: 'Hola', created_at: '2026-03-23T20:00:00Z' }] });

    const response = await request(app)
      .post('/api/v1/messages')
      .set('Authorization', `Bearer ${token}`)
      .send({ receiver_id: 2, publication_id: 3, message: 'Hola, me interesa este producto' });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Mensaje enviado correctamente');
    expect(response.body.data.id).toBe(15);
  });

  test('GET /api/v1/messages debe responder 200 con token válido', async () => {
    const token = jwt.sign({ id: 2, email: 'vendedor@test.com', name: 'Vendedor' }, process.env.JWT_SECRET);
    db.query.mockResolvedValueOnce({ rows: [{ id: 9, message: 'Hola, aún disponible?', publication_id: 3, publication_title: 'Casco integral', counterpart_id: 1, counterpart_name: 'Daniel', counterpart_email: 'daniel@test.com', direction: 'received' }] });

    const response = await request(app)
      .get('/api/v1/messages')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].publication_title).toBe('Casco integral');
  });

  test('GET /api/v1/messages/thread/:publicationId/:userId debe responder 200 con token válido', async () => {
    const token = jwt.sign({ id: 2, email: 'vendedor@test.com', name: 'Vendedor' }, process.env.JWT_SECRET);
    db.query.mockResolvedValueOnce({ rows: [{ id: 9, message: 'Hola, aún disponible?', publication_id: 3, sender_id: 1, receiver_id: 2, sender_name: 'Daniel', receiver_name: 'Vendedor' }] });

    const response = await request(app)
      .get('/api/v1/messages/thread/3/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].publication_id).toBe(3);
  });
});
