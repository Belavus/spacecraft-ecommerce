const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, addProduct, deleteProduct, updateProduct } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');
const {registerUser} = require("../controllers/adminController");

router.route('/register')
    .post(protect,admin,registerUser)
router.route('/users')
    .get(protect, admin, getUsers);
router.route('/users/:id')
    .delete(protect, admin, deleteUser);

router.route('/products')
    .post(protect, admin, addProduct)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

router.route('/products/:id')
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

module.exports = router;
