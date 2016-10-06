$(document).ready(function() {
  var socket = io();

  var username = prompt("당신의 이름은?");
  socket.emit("newUser", username);

  socket.on("setup", function(rooms) {
    console.log(rooms);
  });

  socket.on("notice", function(notice) {
    alert(notice);
  });

  socket.on("chat", function(chat) {
    $("#chat ul").append( $("<li>").text(chat.username + ": " + chat.content) );
  });

  socket.on("newUser", function(username) {
    $("#chat ul").append( $("<li>").text("---" + username + " 님이 참여하였습니다. ---") );
  });

  $("#chat form").submit(function() {
    var content = $("#chat form input[name='content']").val();

    socket.emit("chat", {content: content, username: username});

    $("#chat form input[name='content']").val("");
    return false;
  });
});
