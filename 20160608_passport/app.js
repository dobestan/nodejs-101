var express = require('express');
var mongoose = require('mongoose');
var expressSession = require('express-session');


var app = express();


var User = require("./models/user");


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


mongoose.connect("mongodb://localhost/passport");


app.listen(3000, function(request, response) {
  console.log("Server is listening on localhost:3000");
});
