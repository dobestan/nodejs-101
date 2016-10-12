var path = require("path");
var express = require("express");   // http.createServer
var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");
var session = require("express-session");
// var flash = require("express-flash");
var connectFlash = require("connect-flash");
var messages = require("express-messages");

var mongoose = require("mongoose");

var passport = require("passport");


var socketio = require("socket.io");
var http = require("http");


var homeRouter = require("./routes/home"); // router
var aboutRouter = require("./routes/about"); // router
var methodRouter = require("./routes/method"); // router
var servicesRouter = require("./routes/services");
var flashRouter = require("./routes/flash");
var authRouter = require("./routes/auth");
var apiRouter = require("./routes/api"); // api/index.js
var postsRouter = require("./routes/posts"); // api/index.js

var app = express();
var httpServer = http.Server(app);
var io = socketio(httpServer);


mongoose.connect("mongodb://mongodb.dobest.io/dobestan_koscom");
var db = mongoose.connection;

db.once("open", function() {
  console.log("Database is connected");
});


// Settings
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "templates"));


// Middlewares - express, 3rd party, custom

// http://localhost:3000/static/js/application.js
app.use("/static", express.static(path.join(__dirname, "public")));


// Cookie, Session
app.use(cookieParser());  // cookieParser() == function(req, res, next){...}
app.use(session({
  secret: require("./config/auth").sessionSecret,
  resave: true,
  saveUninitialized: true
}));
// app.use(flash());  // req.flash("key", "value"); // setter
                   // req.flash("key")           // getter
//                 // req.flash()                // getter
// 1. flash message add, 2. flash message consume
app.use(connectFlash());  // express-messages 와 같이 사용하기 위해서


app.use(passport.initialize());
app.use(passport.session());


require("./config/passport")(passport);


// My Middlewares
var logger = function(req, res, next) {
  console.log("Request on", req.url, "at", new Date());
  next();
}
app.use(logger);


app.use(function(req, res, next) {
  res.locals.user = req.user;  // req.user
  next();
});

app.use(function(req, res, next) {
  // res.locals.username = "dobestan";

  // req.flash("success", "회원가입이 성공적으로 되었습니다.");
  // req.flash("error", "비밀번호가 올바르지 않습니다.");

  res.locals.messages = messages(req, res);
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

io.on("connect", function(socket) {
  console.log("Socket is connected: " + socket.id);

  socket.on("enter", function(username) {
    console.log(username + "이 채팅방에 참여했습니다.");
    io.emit("enter", username);
  });

  socket.on("chat", function(data) {
    console.log(data.username + ": " + data.content);
    // 채팅 기록을 DB에 저장
    io.emit("chat", data);
  });

  socket.on("disconnect", function() {
    console.log("Socket is disconnected: ", this.id);
  });
});

// var socket = io();


app.use(function(req, res, next) {
  req.io = io;
  next();
});


app.use("/", homeRouter);
app.use("/about", aboutRouter);
app.use("/method", methodRouter);
app.use("/", servicesRouter);
app.use("/flash", flashRouter);
app.use("/", authRouter);
app.use("/api", apiRouter);
app.use("/posts", postsRouter);


// Error Handling Middleware
app.use(function(err, req, res, next) {
  console.log(err);
  return res.render("error");

  // 강제로 에러 발생
  // var error = new Error("This is my error");
  // return next(error);
});


// io => server
// socket => client







httpServer.listen(3000, function() {
  console.log("Server is running");
});
