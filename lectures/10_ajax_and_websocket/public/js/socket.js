$(document).ready(function() {
  var socket = io.connect();

  socket.on("connect", function() {
    console.log("Socket is connected");
  });

  socket.on("disconnect", function() {
    console.log("Socket is disconnected");
  });
});
