const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017"
const ConnectDB=async()=>{
    try {
        const conn=await mongoose.connect(mongoURI);
        //if connect then log it
        console.log(`MongoDB Connected :${conn.connection.host}`);
    } 
    //if error occurs then print the error
    catch (error) {
        console.log(`Error:${error.message}`);
        process.exit();
    }
};

module.exports = ConnectDB;
