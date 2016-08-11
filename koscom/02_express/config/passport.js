var passportLocal = require("passport-local");
var passportLocalStrategy = passportLocal.Strategy;

var passportFacebook = require("passport-facebook");
var passportFacebookStrategy = passportFacebook.Strategy;

var passportJwt = require("passport-jwt");
var passportJwtStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;

var User = require("../models/user");


module.exports = function(passport) {
  passport.serializeUser( User.serialize() );
  passport.deserializeUser( User.deserialize() );

  passport.use( new passportLocalStrategy( User.authenticate() ) );
  passport.use( new passportFacebookStrategy(
    {
        clientID: "166601673763093",
        clientSecret: "fc3e912cc8a10d23dca0ebc9ce6e5411",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    User.authenticateFacebook()
  ) );

  var passportJwtStrategyOptions = {
    secretOrKey: "dkstncks",
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer")
  };
  passport.use( new passportJwtStrategy(
    passportJwtStrategyOptions,
    function(payload, next) {

      User.findOne({_id: payload._id}, function(error, user) {
        if (error) return next(error, null);
        return next(error, user);
      });
    }
  ) );
}
