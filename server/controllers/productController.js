const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

const updateProductRating = asyncHandler(async (req, res) => {
    const { rating } = req.body;
    const product = await Product.findById(req.params.id);
    const userId = req.user._id;

    if (product) {
        const existingRating = product.ratings.find(r => r.userId.toString() === userId.toString());

        if (existingRating) {
            // update existing rating
            existingRating.rating = rating;
        } else {
            // add rating if rating not exist
            product.ratings.push({ userId, rating });
            product.ratingCount += 1;
        }

        // counting total rating
        product.rating = product.ratings.reduce((total, r) => total + r.rating, 0) / product.ratingCount;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// method to get unique values for filters
const getUniqueProductValues = asyncHandler(async (req, res) => {
    const engineCounts = await Product.distinct("engineCount");
    const engineTypes = await Product.distinct("engineType");
    const purposes = await Product.distinct("purpose");

    res.json({ engineCounts, engineTypes, purposes });
});

module.exports = { getProducts, getProductById, getUniqueProductValues, updateProductRating };
