$(document).ready(function() {
  var socket = io();

  socket.on("setup", function(rooms) {
    console.log(rooms);
  });

  socket.on("chat", function(chat) {
    $("#chat ul").append( $("<li>").text(chat.content) );
  });

  $("#chat form").submit(function() {
    var content = $("#chat form input[name='content']").val();

    socket.emit("chat", {content: content});

    $("#chat form input[name='content']").val("");
    return false;
  });
});
