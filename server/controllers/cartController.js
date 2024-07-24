const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
        const item = cart.items.find((item) => item.product.toString() === productId);
        if (item) {
            item.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        res.json(cart);
    } else {
        const newCart = await Cart.create({
            user: req.user._id,
            items: [{ product: productId, quantity }],
        });
        res.status(201).json(newCart);
    }
});

const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (cart) {
        res.json(cart);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

const updateCart = asyncHandler(async (req, res) => {
    const { items } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
        cart.items = items;
        await cart.save();
        res.json(cart);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

const deleteCartItem = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
        cart.items = cart.items.filter((item) => item.product.toString() !== req.params.id);
        await cart.save();
        res.json(cart);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

module.exports = { addToCart, getCart, updateCart, deleteCartItem };
