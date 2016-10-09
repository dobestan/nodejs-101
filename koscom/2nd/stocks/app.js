var path = require("path");
var http = require("http");

var express = require("express");
var socketio = require("socket.io");


var app = express();
var httpServer = http.Server(app);
var io = socketio(httpServer);


io.on("connect", function(socket) {
  console.log("socket is connected", socket.id);

  socket.on("disconnect", function() {
    console.log("socket is disconnected", this.id);
  });

  setInterval(
    function() {
      io.emit("stocks", "hello world")
    },
    1000
  );
});


app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "pug");


app.use("/static", express.static(path.join(__dirname, "public")));


app.get("/", function(req, res) {
  return res.render("home");
});


httpServer.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
