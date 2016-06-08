var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var messages = require("express-messages");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var passport = require("passport");
var passportLocal = require("passport-local");
var passportLocalStrategy = passportLocal.Strategy;
var passportKakao = require("passport-kakao");
var passportKakaoStrategy = passportKakao.Strategy;


// Load Routers
var homeRouter = require("./routes/home");
var flashRouter = require("./routes/flash");
var authRouter = require("./routes/auth");


// Load Models
var User = require("./models/user");


mongoose.connect("mongodb://localhost/passport");


var app = express();


// Application Settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// Use Middlewares
// Body Parser Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Cookie/Session Settings
app.use(cookieParser("Nodecamp is awesome."));
app.use(session({
  secret: "Nodecamp is awesome.",
  resave: true,
  saveUninitialized: true
}));

// Flash Messages Settings
app.use(flash());
app.use(function(request, response, next) {
  // Flash Messages 를 전부다 읽어서, HTML 내에서 불러올 수 있도록 하는 역할
  response.locals.messages = messages(request, response);
  next();
});


// Passport Settings
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Settings
passport.use(new passportLocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Passport Kakao Settings
passport.use(new passportKakaoStrategy({
    clientID: "64115f61e84e73ea65289ce5b414b00b",
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
  response.locals.user = request.user;
  next();
});


// Use Routers
app.use("/static", express.static(__dirname + "/public"));
app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/flash", flashRouter);


app.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
