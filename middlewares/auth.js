const{getUser} = require('../service/auth');

function checkForAuthentication(req,res,next){
    try{const tokenCookie = req.cookies?.token;
    req.user = null;

    if(
        !tokenCookie 
    )
    return next()
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

function restrictTo(roles=[]){
     return function(req,res,next){
        if(!req.user)return res.status(401).json({ error: "please login" });

      if (!roles.includes(req.user.role)) return res.end("unAuthorized");
        return next();
     };
}

module.exports={
    checkForAuthentication,
    restrictTo
}