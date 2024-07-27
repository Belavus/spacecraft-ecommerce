const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, addProduct, deleteProduct } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id').delete(protect, admin, deleteUser);
router.route('/products').post(protect, admin, addProduct);
router.route('/products/:id').delete(protect, admin, deleteProduct);

module.exports = router;