process.env.JWT_SECRET = 'test_secret';

jest.mock('../src/config/db', () => ({
  query: jest.fn(),
  closePool: jest.fn(),
}));

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/config/db');

describe('Profile routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/v1/profile debe responder 401 sin token', async () => {
    const response = await request(app).get('/api/v1/profile');
    expect(response.statusCode).toBe(401);
  });

  test('GET /api/v1/profile debe responder 200 con token válido', async () => {
    const token = jwt.sign({ id: 1, email: 'daniel@mail.com', name: 'Daniel' }, process.env.JWT_SECRET);
    db.query.mockResolvedValueOnce({ rows: [{ id: 1, name: 'Daniel', email: 'daniel@mail.com', avatar: null }] });

    const response = await request(app)
      .get('/api/v1/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe('daniel@mail.com');
  });
});
