const mongoose = require("mongoose");

const connectDatabase = (data)=>{
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log("MongoDB Connection");
    });
}

module.exports = connectDatabase;