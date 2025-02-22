const{getUser} = require('../service/auth');

function checkForAuthentication(req,res,next){
    try{
        const tokenCookie = req.cookies?.token;
    req.user = null;

    if(!tokenCookie)
    return next();
    const token = tokenCookie;
    const user = getUser(token);

    if (!user) return next();
    req.user = user;
    return next();
}catch(error){
    console.error("Authentication Error:", error);
    return res.status(401).json({ error: "Invalid authentication token" });
};
}

function restrictTo() {
    return function (req, res, next) {
      if (!req.user) {
        return res.status(401).json({ error: "You are not authenticated please sign up/login to get short url" });
      }
      next();
    };
  }
  

module.exports={
    checkForAuthentication,
    restrictTo
}
