var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var homeRoute = require("./routes/home");
var postsRoute = require("./routes/posts");


// Express 어플리케이션 생성
var app = express();


// 데이터베이스와 연결 ( Mongoose, monk )
mongoose.connect("mongodb://localhost/nodecamp");


// Application Settings
// Template Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Staticfiles (css, js, img) serving
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Routes/Middleware
app.use("/", homeRoute);
app.use("/posts", postsRoute);


// Run application on port 3000
app.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
