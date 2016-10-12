var User = require("../models/user");

var passportLocal = require("passport-local");
var passportLocalStrategy = passportLocal.Strategy;


module.exports = function(passport) {
  passport.serializeUser(User.serialize());
  passport.deserializeUser(User.deserialize());

  passport.use(new passportLocalStrategy(User.authenticate()));
  // 1. Local Strategy 를 구현하는 부분
  // 2. User.authenticate 함수를 수정하는 부분
  // 3. auth.js Router 에서 passport.authenticate Middleware 를 사용

  passport.use(new FacebookStrategy({
    clientID: "1139858509419307",
    clientSecret: "1dcaab1854d47b009912b1c43288f62d",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  }, function(accessToken, refreshToken, profile, callback) {
    User.findOne({username: profile.id}, function(error, user) {
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
