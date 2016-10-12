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

    socket.on("enter", function(username) {
      alert(username + "님이 채팅방에 참여했습니다.");
    });






    socket.on("disconnect", function() {
      console.log("Socket is disconnected");
    });
  });
})();
