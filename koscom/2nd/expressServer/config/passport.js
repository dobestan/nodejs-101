var User = require("../models/user");

var passportLocal = require("passport-local");
var passportLocalStrategy = passportLocal.Strategy;

var passportFacebook = require("passport-facebook");
var passportFacebookStrategy = passportFacebook.Strategy;


module.exports = function(passport) {
  passport.serializeUser(User.serialize());
  passport.deserializeUser(User.deserialize());

  passport.use(new passportLocalStrategy(User.authenticate()));
  // 1. Local Strategy 를 구현하는 부분
  // 2. User.authenticate 함수를 수정하는 부분
  // 3. auth.js Router 에서 passport.authenticate Middleware 를 사용
  
  passport.use(new passportFacebookStrategy({
    clientID: "1233479460051194",
    clientSecret: "d8795398b41c64f0bad2992420f9e95f",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  }, function(accessToken, refreshToken, profile, callback) {
    User.findOne({username: profile.id}, function(error, user) {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
      if (error) return callback(error);
      if (user) return callback(error, user);

      var user = new User({
        username: profile.id,
        password: profile.id,
        email: profile.id + "@facebook.com"
      });

      user.save(function(error, user) {
        return callback(error, user);
      });
    });
  }));
}
