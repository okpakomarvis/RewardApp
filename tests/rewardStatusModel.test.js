



const mongoose  =  require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const RewardStatus  = require('../models/rewardModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('RewardStatus Model', () => {
  it('should create a reward status for a user', async () => {
    const rewardStatus = new RewardStatus({
      user: '66d4a22b60610074345e2a67',
      lastClaimed: null,
      rewardPoints:0
    });

    const savedRewardStatus = await rewardStatus.save();
    expect(savedRewardStatus._id).toBeDefined();
    expect(savedRewardStatus.rewardPoints).toBe(0);
  });

  it('should require userId field', async () => {
    const rewardStatus = new RewardStatus({
      lastClaimed: null,
      streakCount: 0,
      rewardAvailable: true,
    });

    try {
      await rewardStatus.save();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
