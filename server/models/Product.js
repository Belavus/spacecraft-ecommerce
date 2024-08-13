const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
    },
    orderCount: {
        type: Number,
        required: true,
        default: 0,
    },
    engineCount: {
        type: Number,
        required: false,
    },
    engineType: {
        type: String,
        required: false,
    },
    purpose: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
        default: 0,
    },
    ratingCount: {
        type: Number,
        required: false,
        default: 0,
    },
    ratings: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        }
    }]
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
