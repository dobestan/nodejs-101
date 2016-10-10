var path = require("path");
var express = require("express");   // http.createServer
var bodyParser = require("body-parser");

var homeRouter = require("./routes/home"); // router
var aboutRouter = require("./routes/about"); // router
var methodRouter = require("./routes/method"); // router
var moviesRouter = require("./routes/movies"); // router
var roomsRouter = require("./routes/rooms"); // router

var app = express();


// Settings
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "templates"));


// Middlewares - express, 3rd party, custom

// http://localhost:3000/static/js/application.js
app.use("/static", express.static(path.join(__dirname, "public")));

var logger = function(req, res, next) {
  console.log("Request on", req.url, "at", new Date());
  next();
}
app.use(logger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use("/", homeRouter);
app.use("/about", aboutRouter);
app.use("/method", methodRouter);
app.use("/movies", moviesRouter);
app.use("/rooms", roomsRouter);


// Error Handling Middleware
app.use(function(err, req, res, next) {
  console.log(err);
  return res.render("error");

  // 강제로 에러 발생
  // var error = new Error("This is my error");
  // return next(error);
});


app.listen(3000, function() {
  console.log("Server is running");
});
