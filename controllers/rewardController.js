const asyncHandler  = require('express-async-handler');
const Reward  = require('../models/rewardModel.js');

// Get daily reward status
const getDailyRewardStatus = asyncHandler(async (req, res) => {
  const reward = await Reward.findOne({ user: req.user._id });

  if (reward) {
    const now = new Date();
    const nextRewardTime = new Date(reward.lastClaimed);
    nextRewardTime.setHours(nextRewardTime.getHours() + 24);

    if (now > nextRewardTime) {
        let points;
   const user =req.user;
  if (user.subscriptionLevel === 'Basic') points = 10;
  if (user.subscriptionLevel === 'Premium') points = 20;
  if (user.subscriptionLevel === 'VIP') points = 30;

  user.streak += 1;
  user.lastClaimed = now;

  if (user.streak % 7 === 0) {
    if (user.subscriptionLevel === 'Basic') points += 20;
    if (user.subscriptionLevel === 'Premium') points += 50;
    if (user.subscriptionLevel === 'VIP') points += 100;
  }
 
      res.json({ rewardAvailable: true, rewardPoints: points });
    } else {
      res.json({ rewardAvailable: false, nextRewardTime });
    }
  } else {
    res.status(404);
    throw new Error('Reward not found');
  }
});

// Claim daily reward
const claimDailyReward = asyncHandler(async (req, res) => {
  let reward = await Reward.findOne({ user: req.user._id });
  const now = new Date();
   let points;
   const user =req.user;
  if (user.subscriptionLevel === 'Basic') points = 10;
  if (user.subscriptionLevel === 'Premium') points = 20;
  if (user.subscriptionLevel === 'VIP') points = 30;

  user.streak += 1;
  user.lastClaimed = now;

  if (user.streak % 7 === 0) {
    if (user.subscriptionLevel === 'Basic') points += 20;
    if (user.subscriptionLevel === 'Premium') points += 50;
    if (user.subscriptionLevel === 'VIP') points += 100;
  }
  if (reward) {
    
    const nextRewardTime = new Date(reward.lastClaimed);
    nextRewardTime.setHours(nextRewardTime.getHours() + 24);

    if (now > nextRewardTime) {
      reward.lastClaimed = now;
      reward.rewardPoints = reward.rewardPoints+points;
      await reward.save();
      res.json({ message: 'Reward claimed successfully', rewardPoints: reward.rewardPoints });
    } else {
      res.status(400);
      throw new Error('Reward not available yet');
    }
  } else {
  
 
    reward = await Reward.create({
      user: req.user._id,
      lastClaimed: new Date(),
      rewardPoints :reward.rewardPoints+ points, 
    });
    res.json({ message: 'Reward claimed successfully', rewardPoints: reward.rewardPoints });
  }
});

//reset streak
const resetStreak = asyncHandler(async (req, res) => {
  const user = req.user;

  if (new Date(user.lastClaimed).getUTCDate() !== new Date().getUTCDate()) {
    user.streak = 0;
    await user.save();
  }

  res.status(200).json({ message: 'Streak reset' });
});


module.exports = { getDailyRewardStatus, claimDailyReward , resetStreak };
