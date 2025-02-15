const {v4: uuidv4} = require('uuid')
const User = require("../models/user");
const {setUser} = require('../service/auth')
const bcrypt = require("bcrypt");
async function handleSignup(req, res) {
    try {
        const { name, email, password } = req.body;
        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword,
        });
        return res.json({ message: "Signup successful"});
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).send({ message: 'This User already exist', error: error.message });
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
