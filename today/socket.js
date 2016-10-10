module.exports = function(io) {
  io.on("connection", function(socket) {
    console.log("Socket is connected");

    socket.on("chat", function(message) {
      console.log("Chat: " + message);
      io.emit("chat", message);
    });

    socket.on("disconnect", function() {
      console.log("Socket is disconnected");
    });
  });
}
