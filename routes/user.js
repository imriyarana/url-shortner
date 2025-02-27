const express = require("express");
const{checkForAuthentication}= require("../middlewares/auth")
const {handleSignup,handleLogin,handleLogout,handleUserStatus} = require("../controllers/user");
const router = express.Router();

router.post("/signup", handleSignup);
router.post("/login",handleLogin)
router.post("/logout",handleLogout);
router.get("/status", checkForAuthentication, handleUserStatus);

module.exports = router;