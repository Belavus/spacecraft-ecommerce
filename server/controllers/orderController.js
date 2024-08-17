const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

const placeOrder = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    const orderedItems = cart.items.filter(item => !item.isOrdered);
    if (orderedItems.length === 0) {
        res.status(400);
        throw new Error('No items to order');
    }

    const order = await Order.create({
        user: req.user._id,
        items: orderedItems.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
        })),
    });

    for (const item of orderedItems) {
        item.isOrdered = true;
        item.product.orderCount += item.quantity;
        await item.product.save();
    }

    // clear cart from ordered products
    cart.items = cart.items.filter(item => !item.isOrdered);
    await cart.save();

    res.status(201).json(order);
});

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
});

module.exports = { placeOrder, getOrders };
