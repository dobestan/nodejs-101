

module.exports = function(io) {
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
}
