const mongoose= require("mongoose")
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const DB_URL = process.env.MONGO_URL;

async function main() {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to DB");
    } catch (err) {
        console.error("Error connecting to DB:", err);
    }
}

module.exports = main;
