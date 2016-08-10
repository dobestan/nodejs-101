var path = require("path");
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var csurf = require("csurf");
var mongoose = require("mongoose");

var homeRouter = require("./routes/home");
var zigbangRouter = require("./routes/zigbang");
var watchaRouter = require("./routes/watcha");
var methodsRouter = require("./routes/methods");
var contactsRouter = require("./routes/contacts");
var postsRouter = require("./routes/posts");

var methodMiddleware = require("./middlewares/method");


var app = express();


mongoose.connect("mongodb://mongodb.dobest.io/suchan");
var db = mongoose.connection;


db.once("open", function() {
  console.log("Database is connected");
});


// Application Settings
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// 3rd Party Middlewares
app.use( morgan("combined") );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: true}) );

// var cookieParser = require("cookie-parser");
// var session = require("express-session");
app.use( cookieParser() );
app.use( session({
  secret: "node.js",
  resave: true,
  saveUninitialized: true
}) );
// var csrfTokenMiddleware = csurf({cookie: true});
// function(req, res, next)
// app.use( csurf({cookie: true}) );


// app.use( methodMiddleware.getPostDataMiddleware() );


app.use( function(req, res, next) {
  // res.render(templateName, context);
  // context ( == res.locals )
  // res.locals.csrfToken = req.csrfToken();
  next();
});


// Routers
app.use("/", homeRouter);
app.use("/zigbang/", zigbangRouter);
app.use("/watcha/", watchaRouter);
app.use("/methods/", methodsRouter);
app.use("/contacts/", contactsRouter);
app.use("/posts/", postsRouter);


// Error Handling Middleware
app.use(function(error, req, res, next) {
  res.status(error.status || 500);
  return res.render("error", {error: error});

  next();
});
// next(); ===> function(req, res, next);
// next(error); ===> function(error, req, res, next);


app.listen(3000, function() {
  console.log("Server is listening");
});
