process.env.JWT_SECRET = 'test_secret';

jest.mock('../src/config/db', () => ({
  query: jest.fn(),
  closePool: jest.fn(),
}));

const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const db = require('../src/config/db');

describe('Auth routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/v1/auth/register debe responder 201 cuando el usuario es válido', async () => {
    db.query
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [{ id: 1, name: 'Daniel', email: 'daniel@mail.com', avatar: null }] });

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Daniel', email: 'daniel@mail.com', password: '123456' });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Usuario registrado correctamente');
  });

  test('POST /api/v1/auth/register debe responder 409 si el email ya existe', async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'daniel@mail.com' }] });

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Daniel', email: 'daniel@mail.com', password: '123456' });

    expect(response.statusCode).toBe(409);
  });

  test('POST /api/v1/auth/login debe responder 200 con credenciales válidas', async () => {
    const hash = await bcrypt.hash('123456', 10);
    db.query.mockResolvedValueOnce({ rows: [{ id: 1, name: 'Daniel', email: 'daniel@mail.com', password: hash, avatar: null }] });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'daniel@mail.com', password: '123456' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test('POST /api/v1/auth/login debe responder 401 con credenciales inválidas', async () => {
    const hash = await bcrypt.hash('otra', 10);
    db.query.mockResolvedValueOnce({ rows: [{ id: 1, name: 'Daniel', email: 'daniel@mail.com', password: hash, avatar: null }] });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'daniel@mail.com', password: '123456' });

    expect(response.statusCode).toBe(401);
  });
});
