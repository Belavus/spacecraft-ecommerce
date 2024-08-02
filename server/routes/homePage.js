const express = require('express');
const router = express.Router();
const { getHomePageInfo, updateHomePageInfo } = require('../controllers/homePageController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
    .get(getHomePageInfo)
    .put(protect, admin, updateHomePageInfo);

module.exports = router;
