const express = require('express');
const app = express();
const connectDb = require("./connect");
const cookieParser = require('cookie-parser');
const { checkForAuthentication,  restrictTo}= require("./middlewares/auth")
const staticRoute = require("./routes/staticRoute");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const URL = require('./models/url');
const port = 8080;
connectDb ();

app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL"]),urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get('/url/:shortId', async (req,res)=>{
    const shortId = req.params.shortId;
   const entry = await URL.findOneAndUpdate({
shortId,
    },{
        $push : {
            visitHistory:{
                timestamp: Date.now(),
            },
        },
    });
    res.redirect(entry.redirectURL);
});

app.listen(port,()=>{
    console.log('app is listening to port 8080');
});