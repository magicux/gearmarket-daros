process.env.JWT_SECRET = 'test_secret';

jest.mock('../src/config/db', () => ({
  query: jest.fn(),
  closePool: jest.fn(),
}));

const request = require('supertest');
const app = require('../src/app');

describe('App', () => {
  test('GET /health devuelve 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
  });
});
