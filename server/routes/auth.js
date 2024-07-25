const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, registerAdmin } = require('../controllers/authController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.post('/register', protect, admin, registerUser);
router.post('/register-admin', protect, admin, registerAdmin);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
