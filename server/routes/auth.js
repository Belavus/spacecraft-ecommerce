const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, registerAdmin } = require('../controllers/authController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.post('/register', registerUser); // Регистрация обычного пользователя не требует аутентификации
router.post('/register-admin', protect, admin, registerAdmin); // Регистрация админа требует аутентификации и прав админа
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
