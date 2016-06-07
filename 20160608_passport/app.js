var express = require('express');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportLocalStrategy = passportLocal.Strategy;
var passportFacebook = require('passport-facebook');
var passportFacebookStrategy = passportFacebook.Strategy;
var passportKakao = require('passport-kakao');
var passportKakaoStrategy = passportKakao.Strategy;
var bodyParser = require("body-parser");

var flash = require('connect-flash');
var expressMessages = require('express-messages');

var User = require('./models/user');

var homeRouter = require("./routes/home");
var authRouter = require("./routes/auth");
var flashRouter = require("./routes/flash");


var app = express();


var User = require("./models/user");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser("Awesome Nodecamp"));
app.use(expressSession({secret: "Nodecamp is Awesome", resave: true, saveUninitialized: true}));
app.use(flash());


// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


passport.use(new passportFacebookStrategy({
    clientID: "1139858509419307",
    clientSecret: "1dcaab1854d47b009912b1c43288f62d",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({facebookId: profile.id}, function(error, user) {
      if (error) return done(error);
      if (!user) {
        user = new User({
          username: profile.displayName,
          facebookId: profile.id
        });

        user.save(function(error) {
          if (error) return done(error);
        });
      }

      return done(error, user);
    });
  }
));


passport.use(new passportKakaoStrategy({
    clientID: "cbc43032a00e28820d7e4e5bda3b7f13",
    callbackURL: "http://localhost:3000/auth/kakao/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({kakaoId: profile.id}, function(error, user) {
      if (error) return done(error);
      if (!user) {
        user = new User({
          username: profile.id,
          kakaoId: profile.id
        });

        user.save(function(error) {
          if (error) return done(error);
        });
      }

      return done(error, user);
    });
  }
));


app.use(function(request, response, next) {
  response.locals.messages = expressMessages(request, response);
  next();
});


app.use(function(request, response, next) {
  response.locals.user = request.user;
  next();
});

app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/flash", flashRouter);


mongoose.connect("mongodb://localhost/passport");


app.listen(3000, function(request, response) {
  console.log("Server is listening on localhost:3000");
});
