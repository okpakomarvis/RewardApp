

const request  =  require('supertest');
const app  = require('../server');
const User  = require('../models/userModel');
const generateToken  = require('../config/generateToken');

describe('Auth Controller', () => {
  let user;

  beforeAll(async () => {
    user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
  });

  afterAll(async () => {
    await User.deleteMany();
  });

  it('should register a user and return a token', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.name).toBe('Jane Doe');
  });

  it('should login a user and return a token', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not login with wrong credentials', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'john@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
  });

  it('should get user profile', async () => {
    const token = generateToken(user._id);

    const response = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'John Doe');
  });
});
