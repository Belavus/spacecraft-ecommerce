const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Product = require('../models/Product');
const {EMAIL_REGEX, PASSWORD_MIN_LENGTH} = require("../utils/constants");
const generateToken = require("../utils/generateToken");

//Register user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    // email validation
    if (!EMAIL_REGEX.test(email)) {
        res.status(400);
        throw new Error('Invalid email format');
    }

    // password validation
    if (password.length < PASSWORD_MIN_LENGTH) {
        res.status(400);
        throw new Error(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long`);
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        isAdmin,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// Get all users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await User.deleteOne({ _id: req.params.id });
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Add product
const addProduct = asyncHandler(async (req, res) => {
    const { name, price, description, imageUrl, videoUrl, engineCount, engineType, purpose } = req.body;

    try {
        const product = new Product({
            name,
            price,
            description,
            imageUrl,
            videoUrl,
            engineCount,
            engineType,
            purpose,
            user: req.user._id,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400);
            throw new Error('Product name must be unique');
        } else {
            res.status(500);
            throw new Error('Internal Server Error');
        }
    }
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: req.params.id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, imageUrl, videoUrl, engineCount, engineType, purpose } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.imageUrl = imageUrl;
        product.videoUrl = videoUrl;
        product.engineCount = engineCount;
        product.engineType = engineType;
        product.purpose = purpose;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

module.exports = { registerUser, getUsers, deleteUser, addProduct, deleteProduct, updateProduct };
