var express = require('express');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var path = require('path');
var passport = require('passport');

var homeRouter = require("./routes/home");
var authRouter = require("./routes/auth");


var app = express();


var User = require("./models/user");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.use(expressSession({secret: "Nodecamp is Awesome"}));
app.use(passport.initialize());
app.use(passport.session());


// Configure Passport
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(error, user) {
    done(error, user);
  });
});


app.use("/", homeRouter);
app.use("/", authRouter); 


mongoose.connect("mongodb://localhost/passport");


app.listen(3000, function(request, response) {
  console.log("Server is listening on localhost:3000");
});
