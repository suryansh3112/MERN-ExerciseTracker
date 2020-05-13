const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Exercise-TrackerDB",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false});

mongoose.connection.once('open',()=>{
    console.log("MongoDB connection established.");
    
});

const exerciseRoute = require("./route/exercises");
const userRoute = require("./route/users");

app.use("/exercise",exerciseRoute);
app.use("/user",userRoute);

app.listen(5000, ()=>{
    console.log("Server running on port 5000.");
})


