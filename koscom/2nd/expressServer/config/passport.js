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
}
