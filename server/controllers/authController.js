const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        isAdmin: false, // Регистрация обычного пользователя
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

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

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
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

module.exports = { registerUser, loginUser, getUserProfile, registerAdmin };


// const asyncHandler = require('express-async-handler');
// const User = require('../models/User');
// const generateToken = require('../utils/generateToken');
//
// const registerUser = asyncHandler(async (req, res) => {
//     const { name, email, password, isAdmin } = req.body;
//
//     const userExists = await User.findOne({ email });
//
//     if (userExists) {
//         res.status(400);
//         throw new Error('User already exists');
//     }
//
//     const user = await User.create({
//         name,
//         email,
//         password,
//         isAdmin,
//     });
//
//     if (user) {
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             token: generateToken(user._id),
//         });
//     } else {
//         res.status(400);
//         throw new Error('Invalid user data');
//     }
// });
//
// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//
//     const user = await User.findOne({ email });
//
//     if (user && (await user.matchPassword(password))) {
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             token: generateToken(user._id),
//         });
//     } else {
//         res.status(401);
//         throw new Error('Invalid email or password');
//     }
// });
//
// const getUserProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);
//
//     if (user) {
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//         });
//     } else {
//         res.status(404);
//         throw new Error('User not found');
//     }
// });
//
// const registerAdmin = asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;
//
//     const userExists = await User.findOne({ email });
//
//     if (userExists) {
//         res.status(400);
//         throw new Error('User already exists');
//     }
//
//     const user = await User.create({
//         name,
//         email,
//         password,
//         isAdmin: true,
//     });
//
//     if (user) {
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             token: generateToken(user._id),
//         });
//     } else {
//         res.status(400);
//         throw new Error('Invalid user data');
//     }
// });
//
// module.exports = { registerUser, loginUser, getUserProfile, registerAdmin };