const express = require("express");
const {handleGenerateNewShortURL, handleGetAnalytics} = require("../controllers/url");
const {restrictTo} = require("../middlewares/auth");
const router = express.Router();

router.post('/',restrictTo, handleGenerateNewShortURL);

router.get('/analytics/:shortId', handleGetAnalytics);
module.exports = router;