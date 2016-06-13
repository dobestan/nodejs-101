var path = require("path");
var express = require("express");
var http = require("http");
var socketio = require("socket.io");


var app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.use("/static", express.static(path.join(__dirname, "public")));


app.get("/", function(request, response) {
  return response.render("home");
});


var httpServer = http.Server(app);
var io = socketio(httpServer);


io.on("connection", function(socket) {
  console.log("Socket.io Connected");

  socket.on("chat", function(message) {
    console.log("Chat: " + message);
    io.emit("chat", message);
  });

  socket.on("disconnect", function() {
    console.log("Socket.io Disconnected");
  });
});


httpServer.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
