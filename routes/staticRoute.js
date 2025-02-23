const express = require("express");
const URL= require("../models/url");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.get("/",restrictTo(),async (req, res) => {
    try {
        const allUrls = await URL.find({ createdBy: req.user._id });
        return res.json({ urls: allUrls });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/signup", (req, res) => {
    return res.json({ message: "Signup route" });
});

router.get("/login", (req, res) => {
    return res.json({ message: "Login route" });
});


module.exports = router;