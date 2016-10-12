// Client
(function() {
  $(document).ready(function() {
    var socket = io();
    var username = undefined;

    socket.on("connect", function() {
      console.log("Socket is connected: " + socket.id);
      username = prompt("닉네임을 입력하세요: ")
      socket.emit("enter", username);
    });

    socket.on("disconnect", function() {
      console.log("Socket is disconnected");
    });
  });
})();
