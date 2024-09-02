const express = require('express');
const { getDailyRewardStatus, claimDailyReward, resetStreak }  = require('../controllers/rewardController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/status', protect, getDailyRewardStatus);
router.post('/claim', protect, claimDailyReward);
router.post('/reset',protect, resetStreak);


module.exports = router;
