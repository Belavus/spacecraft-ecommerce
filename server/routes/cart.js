const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCart, deleteCartItem } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
    .get(protect, getCart)
    .post(protect, addToCart)
    .put(protect, updateCart);

router.route('/:id')
    .delete(protect, deleteCartItem);

module.exports = router;
