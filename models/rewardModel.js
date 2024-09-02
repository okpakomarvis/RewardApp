const mongoose = require('mongoose');

const rewardSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    lastClaimed: {
      type: Date,
      default: Date.now,
    },
    rewardPoints: {
      type: Number,
      default: 0, // Default reward points
    },
  },
  { timestamps: true }
);

const Reward = mongoose.model('Reward', rewardSchema);


module.exports = Reward;