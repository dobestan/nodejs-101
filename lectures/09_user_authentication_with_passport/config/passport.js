var LocalStrategy = require('passport-local').Strategy;

var User = require("../models/user");


module.exports = function(passport) {
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serialize());
  passport.deserializeUser(User.deserialize());
}
