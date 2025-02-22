const {v4: uuidv4} = require('uuid')
const User = require("../models/user");
const {setUser} = require("../service/auth")
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY;

async function handleSignup(req, res) {
    try {
        const { name, email, password } = req.body;
        //checking existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser= await User.create({
            name,
            email,
            password: hashedPassword,
        });
        //Generate JWT token
        const token = jwt.sign({id: newUser._id},JWT_SECRET,{expiresIn:"1d"});
        
       //Token setting 
       res.cookie("token",token,{httpOnly:true, secure:process.env.NODE_ENV==="production"});
       
        return res.json({ message: "Signup successful"});
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).send({ message:"error occured", error: error.message });
    };
}

//checking user login
async function handleLogin(req, res) {

    try{ const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user){
    return res.status(401).json({ error: "Invalid email or password" });}
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = setUser(user);
        res.cookie("token", token);
        return res.json({ message: "Login successful", token });}
        catch(error){
          console.error("login error", error)
          return res.status(500).json({error:"Internet server error"})
        }
   
}
module.exports = {
    handleSignup,
    handleLogin,
}
