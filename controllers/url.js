const shortid = require("shortid");
const URL = require ('../models/url');

async function handleGenerateNewShortURL(req,res){
      const body = req.body;
      if(!body.url)
       return res.status(400).json({error:"url is required please provide the url meow"});
      
    //checks if url already exists in db
    const existingUrlEntry = await URL.findOne({ redirectURL: body.url });

    if (existingUrlEntry) {
        return res.json({ id: existingUrlEntry.shortId }); // it returns the existing shortId
    }

      let shortID;
      let isUnique = false;

    while (!isUnique) {
        shortID = shortid();
        const existingUrl = await URL.findOne({ shortId: shortID });
        if (!existingUrl) isUnique = true;
    }
      await URL.create({
        shortId : shortID,
        redirectURL: body.url,
        visitHistory: []
      });
  return res.json({id: shortID});
}

async function handleGetAnalytics(req,res){
  const shortId = req.params.shortId;
  const result= await URL.findOne({shortId});
  return res.json({
    totalClicks:result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
      handleGenerateNewShortURL,
      handleGetAnalytics,
}