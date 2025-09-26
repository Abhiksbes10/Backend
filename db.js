
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;


const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

module.exports = connectToMongo;



