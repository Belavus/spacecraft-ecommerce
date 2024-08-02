const mongoose = require('mongoose');

const homePageSchema = mongoose.Schema({
    carouselImages: [
        {
            type: String,
            required: true
        }
    ],
    welcomeText: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const HomePage = mongoose.model('HomePage', homePageSchema);

module.exports = HomePage;
