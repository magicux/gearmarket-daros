process.env.JWT_SECRET = 'test_secret';

jest.mock('../src/config/db', () => ({
  query: jest.fn(),
  closePool: jest.fn(),
}));

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/config/db');

describe('Publications routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/v1/publications debe responder 200', async () => {
    db.query.mockResolvedValueOnce({ rows: [{
      id: 10, title: 'Bicicleta', description: 'Muy buena', price: 520000, image_url: 'https://img.test/bici.jpg',
      category: 'ciclismo', location: 'Valparaíso', user_id: 1, seller_name: 'Ana', seller_email: 'ana@test.cl',
    }] });

    const response = await request(app).get('/api/v1/publications');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/v1/publications debe responder 201 con token válido', async () => {
    const token = jwt.sign({ id: 1, email: 'daniel@mail.com', name: 'Daniel' }, process.env.JWT_SECRET);
    db.query.mockResolvedValueOnce({ rows: [{ id: 99 }] });

    const response = await request(app)
      .post('/api/v1/publications')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Mancuernas', description: 'Ajustables', price: 90000, image_url: 'https://img.test/m.jpg', category: 'fitness', location: 'Viña' });

    expect(response.statusCode).toBe(201);
    expect(response.body.publication_id).toBe(99);
  });
});
