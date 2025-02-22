require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY

function setUser(user){
    return jwt.sign(
        {
            name:user.name,
            id:user._id,
            email:user.email,
        },
        JWT_SECRET,{
            expiresIn:"1d", //token expiration time 
        });
};

function getUser(token){
    //get token from cookies
    if(!token) return null;
    try{
        return jwt.verify(token,JWT_SECRET);
    } catch(error){
        return null;
    }  
}

module.exports = {
    setUser,
    getUser
}