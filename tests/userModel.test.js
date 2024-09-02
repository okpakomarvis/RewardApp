
const mongoose  =  require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User  = require('../models/userModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Model Test Suite', () => {
  it('should create a user with valid data', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    const user = await User.create(userData);

    expect(user._id).toBeDefined();
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.password).not.toBe(userData.password); // Password should be hashed
  });

  it('should not create a user without a required field', async () => {
    const invalidUserData = {
      email: 'john@example.com',
      password: 'password123',
    };

    let err;
    try {
      await User.create(invalidUserData);
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.name).toBe('ValidationError');
  });

  it('should not create a user with duplicate email', async () => {
    const userData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
    };

    await User.create(userData);

    let err;
    try {
      await User.create(userData);
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.code).toBe(11000); // MongoDB duplicate key error code
  });

  it('should correctly hash the password', async () => {
    const userData = {
      name: 'Hash Test',
      email: 'hashtest@example.com',
      password: 'password123',
    };

    const user = await User.create(userData);
    expect(user.password).not.toBe('password123');
  });

  it('should match the correct password using matchPassword method', async () => {
    const userData = {
      name: 'Password Test',
      email: 'passwordtest@example.com',
      password: 'password123',
    };

    const user = await User.create(userData);
    const isMatch = await user.matchPassword('password123');
    expect(isMatch).toBe(true);
  });

});
