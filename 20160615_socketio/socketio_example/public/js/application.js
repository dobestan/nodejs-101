var socket = io();


$("form#simple-chat-form").submit(function() {
  var message = $("#message").val();
  socket.emit("chat", message);
  $("#message").val("");
  return false;
});


socket.on("chat", function(message) {
  var chatHistory = $("ul#simple-chat-history");
  chatHistory.append($("<li>").text(message));
});
