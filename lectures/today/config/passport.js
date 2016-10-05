var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require("../models/user");


module.exports = function(passport) {
  // local authentication
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serialize());
  passport.deserializeUser(User.deserialize());

  // facebook authentication
  // passport.use(new FacebookStrategy({
  //   clientID: "1139858509419307",
  //   clientSecret: "1dcaab1854d47b009912b1c43288f62d",
  //   callbackURL: "http://localhost:3000/auth/facebook/callback"
  // }, function(accessToken, refreshToken, profile, callback) {
  //   User.findOne({username: profile.id}, function(error, user) {
  //     if (error) return callback(error);
  //     if (user) return callback(error, user);
  //
  //     var user = new User({
  //       username: profile.id,
  //       password: profile.id,
  //       email: profile.id + "@facebook.com"
  //     });
  //
  //     user.save(function(error, user) {
  //       return callback(error, user);
  //     });
  //   });
  // }));
}
