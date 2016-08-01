var path = require("path");

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


var homeRouter = require("./routes/home");
var moviesRouter = require("./routes/movies");


var app = express();


mongoose.connect("mongodb://localhost/nodecamp");


// Application Settings
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// Middleware - body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Middleware - Router
app.use("/", homeRouter);
app.use("/movies/", moviesRouter);


app.listen(3000, function() {
  console.log("Server is running");
});
