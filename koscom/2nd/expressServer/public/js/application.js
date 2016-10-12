// Client
(function() {
  $(document).ready(function() {
    var socket = io();
    var username = undefined;

    var chatElement = $("#chat");
    var newChat = function(message) {
      $(chatElement).append("<li>" + message + "</li>");
    }

    var formElement = $("form");
    var inputElement = $("input[name='content']");
    $(formElement).submit(function() {
      var content = $(inputElement).val();
      var data = {
        username: username,
        content: content
      };
      socket.emit("chat", data);
      $(inputElement).val("");

      return false;
    });

    socket.on("connect", function() {
      console.log("Socket is connected: " + socket.id);
      username = prompt("닉네임을 입력하세요: ")
      socket.emit("enter", username);
    });

    socket.on("chat", function(data) {
      newChat(data.username + ": " + data.content);
    });

    socket.on("enter", function(username) {
      newChat(username + "님이 채팅방에 참여했습니다.");
    });

    socket.on("notice", function(message) {
      alert("[공지] " + message);
    })




    socket.on("disconnect", function() {
      console.log("Socket is disconnected");
    });
  });
})();
