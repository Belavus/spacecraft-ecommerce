const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    // createProduct,
    // updateProduct,
    // deleteProduct,
    getUniqueProductValues,
    updateProductRating,
} = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
    .get(getProducts);
    // .post(createProduct);

router.route('/:id/rating')
    .put(protect, updateProductRating);

router.route('/:id')
    .get(getProductById)
    // .put(updateProduct)
    // .delete(deleteProduct);
router.route('/unique/values').get(getUniqueProductValues);

module.exports = router;
