var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");

// 1. cookie-parser
// 2. express-session


// Load Routers
var homeRouter = require("./routes/home");
var flashRouter = require("./routes/flash");
var authRouter = require("./routes/auth");


var app = express();


// Application Settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// Application Middlewares
// staticfiles - css, js(client), font, images 
app.use("/static/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());  // req, res, next
app.use(session({
    secret: "nodecampus",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());


// Router ( == Middlewares )
app.use("/", homeRouter);
app.use("/flash", flashRouter);
app.use("/", authRouter); // signup, login


// flashRouter
// GET "/flash/" : Flash Message JSON : "hello GET!"
// POST "/flash/" : Add Flash Message : "hello POST!"


app.listen(process.env.PORT, function() {
  console.log("Server is running");
});
