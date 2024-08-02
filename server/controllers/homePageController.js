const asyncHandler = require('express-async-handler');
const HomePage = require('../models/HomePage');

const getHomePageInfo = asyncHandler(async (req, res) => {
    const homePageInfo = await HomePage.findOne({});
    if (homePageInfo) {
        res.json(homePageInfo);
    } else {
        res.status(404);
        throw new Error('HomePage information not found');
    }
});

const updateHomePageInfo = asyncHandler(async (req, res) => {
    const { carouselImages, welcomeText } = req.body;

    const homePageInfo = await HomePage.findOne({});
    if (homePageInfo) {
        homePageInfo.carouselImages = carouselImages;
        homePageInfo.welcomeText = welcomeText;
        const updatedHomePageInfo = await homePageInfo.save();
        res.json(updatedHomePageInfo);
    } else {
        const newHomePageInfo = await HomePage.create({
            carouselImages,
            welcomeText,
        });
        res.status(201).json(newHomePageInfo);
    }
});

module.exports = { getHomePageInfo, updateHomePageInfo };
