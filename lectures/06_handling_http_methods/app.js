var path = require("path");

var express = require("express");
var bodyParser = require("body-parser");


var homeRouter = require("./routes/home");
var httpRouter = require("./routes/http");
var usersRouter = require("./routes/users");


var app = express();


// Application Settings
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// Middleware - body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Middleware - Router
app.use("/", homeRouter);
app.use("/http/", httpRouter);
app.use("/users/", usersRouter);


app.listen(3000, function() {
  console.log("Server is running");
});
