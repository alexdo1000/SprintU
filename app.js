var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var dotenv = require('dotenv');
var mongoose = require("mongoose");

dotenv.config();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// Database Setup
var dbUrl = process.env.DB_URL || "mongodb://localhost/sprintu";
mongoose.set('useUnifiedTopology', true);
mongoose.connect(dbUrl, { 
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log("ERROR: ", err.message);
})

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/apple", function(req, res){
    res.render("landing");
});

app.listen(3000, function(){
    console.log("SprintU Server has started!");
});