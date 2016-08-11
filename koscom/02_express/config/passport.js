var passportLocal = require("passport-local");
var passportLocalStrategy = passportLocal.Strategy;

var User = require("../models/user");


module.exports = function(passport) {
  passport.serializeUser( User.serialize() );
  passport.deserializeUser( User.deserialize() );

  passport.use( new passportLocalStrategy( User.authenticate() ) );
}
