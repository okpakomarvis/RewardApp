const asyncHandler  = require('express-async-handler');
const User  =  require ('../models/userModel.js');
const generateToken = require('../config/generateToken.js');
const Reward  = require('../models/rewardModel.js');

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, subscriptionLevel } = req.body;

  const userExists = await User.findOne({ email });
  const now = new Date();

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    subscriptionLevel,
  });

  if (user) {
   
  await Reward.create({
      user: user._id,
      lastClaimed: null,
      rewardPoints: 0, 
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      subscriptionLevel: user.subscriptionLevel,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Authenticate user & get token
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      subscriptionLevel: user.subscriptionLevel,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      subscriptionLevel: user.subscriptionLevel,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = { registerUser, authUser, getUserProfile };

