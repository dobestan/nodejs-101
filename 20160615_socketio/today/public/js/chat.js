$(document).ready(function() {
  var socket = io();

  var username = prompt("닉네임을 입력하세요: ");

  socket.emit("joined", username);
  socket.on("joined", function(username) {
    var chatListElement = $("#chat-list");
    chatListElement.append($("<li>").text("=====" + username + "이 입장했습니다." + "====="));
  });

  $("form").submit(function() {
    var inputElement = $("form input[name='content']");
    var content = $(inputElement).val();
    var data = {
      username: username,
      content: content
    };

    socket.emit("chat", data);

    $(inputElement).val("");
    return false;
  });

  socket.on("chat", function(data) {
    var username = data.username;
    var content = data.content;

    appendChatMessage(username, content);
  });

  function appendChatMessage(username, content) {
    var chatListElement = $("#chat-list");
    chatListElement.append($("<li>").text(username + ": " + content));
  }
});
