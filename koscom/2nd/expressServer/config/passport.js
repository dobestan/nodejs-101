var User = require("./models/user");


module.exports = function(passport) {
  passport.serializeUser(User.serialize());
  passport.deserializeUser(User.deserialize());
}
