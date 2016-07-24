var path = require("path");

var express = require("express");

var router = require("./router");


var app = express();


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


app.use("/", router);


app.listen(3000, function() {
  console.log("Server is running");
});
