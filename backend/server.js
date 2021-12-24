const app = require("./app");

const dotenv = require("dotenv")

const connectDatabase = require("./config/database")

// Handling Uncaught Exception

process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception")
    process.exit(1);
})



//Config
dotenv.config({path: "backend/config/config.env"})

//Connecting to database : 
connectDatabase();



const server = app.listen(process.env.PORT, ()=>{

    console.log("Server is working");
})

// Unhandled Promise Rejection

process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Doen the Server`);

    server.close(()=>{
        process.exit(1);
    });
});
