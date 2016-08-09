var path = require("path");
var express = require("express");
var morgan = require("morgan");

var homeRouter = require("./routes/home");
var zigbangRouter = require("./routes/zigbang");


var app = express();


// Application Settings
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// 3rd Party Middlewares
app.use( morgan("combined") );


// Routers
app.use("/", homeRouter);
app.use("/zigbang/", zigbangRouter);


app.listen(3000, function() {
  console.log("Server is listening");
});
