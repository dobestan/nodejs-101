var path = require("path");

var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");

var homeRouter = require("./routes/home");


mongoose.connect("mongodb://localhost/nodecamp");
var db = mongoose.connection;


db.once("open", function() {
  console.log("Database is connected");
});


var app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", homeRouter);


app.listen(3000, function() {
  console.log("Server is running");
});
