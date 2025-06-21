const express = require('express');
const router = express.Router();
const {
  createToken,
  getWaitingTokens,
  callNextToken,
  getCurrentToken,
  resetQueue
} = require('../controllers/tokenController');
const auth = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');
// console.log("✅ tokenRoutes.js loaded");


// ❌ Public — Patients can generate token without login
router.post('/token', createToken);

// ✅ Optional auth — current token is public
router.get('/token/current', getCurrentToken);
router.get('/token/waiting',getWaitingTokens);

// ✅ Receptionist or Admin
router.post('/token/call', auth, authorize('receptionist', 'admin'),callNextToken);

// ✅ Admin only
router.delete('/token/reset', auth, authorize('admin'),resetQueue);


// 🔥 Add this for testing
router.get('/test', (req, res) => {
  res.send('✅ /api/test route working');
});

module.exports = router;

