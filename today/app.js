var path = require("path");
var express = require("express");


// Load Routers
var homeRouter = require("./routes/home");


var app = express();


// Application Settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// Application Middlewares


// Router ( == Middlewares )
app.use("/", homeRouter);


app.listen(3000, function() {
  console.log("Server is running");
});
