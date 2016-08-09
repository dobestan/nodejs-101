var path = require("path");

var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");
var flash = require("connect-flash");
var messages = require("express-messages");
var passport = require("passport");
var socketio = require("socket.io");

var homeRouter = require("./routes/home");
var authRouter = require("./routes/auth");
var flashRouter = require("./routes/flash");
var postsRouter = require("./routes/posts");
var apiRouter = require("./routes/api");
var chatRouter = require("./routes/chat");


mongoose.connect("mongodb://localhost/nodecamp");
var db = mongoose.connection;


db.once("open", function() {
  console.log("Database is connected");
});


var app = express();
var httpServer = http.Server(app);
var io = socketio(httpServer);


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.use(session({
  secret: "nodecamp",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
app.use(function(request, response, next) {
  response.locals.messages = messages(request, response);
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);


app.use(function(request, response, next) {
  response.locals.user = request.user;

  next();
});


app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/flash/", flashRouter);
app.use("/posts/", postsRouter);
app.use("/api/", apiRouter);
app.use("/chat/", chatRouter);


app.use(function(error, request, response, next) {
  response.status(error.status || 500);
  return response.render("error", {error: error});
});


require("./socket")(io);


httpServer.listen(3000, function() {
  console.log("Server is running");
});
