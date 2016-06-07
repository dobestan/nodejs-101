var express = require('express');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportLocalStrategy = passportLocal.Strategy;
var bodyParser = require("body-parser");

var flash = require('connect-flash');
var expressMessages = require('express-messages');

var User = require('./models/user');

var homeRouter = require("./routes/home");
var authRouter = require("./routes/auth");
var flashRouter = require("./routes/flash");


var app = express();


var User = require("./models/user");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser("Awesome Nodecamp"));
app.use(expressSession({secret: "Nodecamp is Awesome", resave: true, saveUninitialized: true}));
app.use(flash());


// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(request, response, next) {
  response.locals.messages = expressMessages(request, response);
  next();
});

app.use(function(request, response, next) {
  response.locals.user = request.user;
  next();
});

app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/flash", flashRouter);


mongoose.connect("mongodb://localhost/passport");


app.listen(3000, function(request, response) {
  console.log("Server is listening on localhost:3000");
});
