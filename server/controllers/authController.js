const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { PASSWORD_MIN_LENGTH, EMAIL_REGEX } = require('../utils/constants');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

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
        isAdmin: false,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

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

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    const isMatch = await user.matchPassword(currentPassword);

    if (user && isMatch) {
        console.log('Password changed');
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } else {
        res.status(400);
        throw new Error('Current password is incorrect');
    }
});

module.exports = { registerUser, loginUser, getUserProfile, changePassword };