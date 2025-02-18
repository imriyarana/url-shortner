require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET_KEY

function setUser(user){
    return jwt.sign(
        {
            name:user.name,
            id:user._id,
            email:user.email,
            role:user.role,
        },
        JWT_SECRET);
};

function getUser(token){
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