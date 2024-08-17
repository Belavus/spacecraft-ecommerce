const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    getUniqueProductValues,
    updateProductRating,
} = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
    .get(getProducts);

router.route('/:id/rating')
    .put(protect, updateProductRating);

router.route('/:id')
    .get(getProductById)
router.route('/unique/values').get(getUniqueProductValues);

module.exports = router;
