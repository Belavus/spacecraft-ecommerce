const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, registerAdmin } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { changePassword } = require('../controllers/authController');

router.post('/register', registerUser); // Регистрация обычного пользователя не требует аутентификации
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/change-password', protect, changePassword);

module.exports = router;
