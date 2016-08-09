$(document).ready(function() {
  var socket = io.connect();

  socket.on("connect", function() {
    console.log("Socket is connected");
  });

  socket.on("disconnect", function() {
    console.log("Socket is disconnected");
  });

  socket.on("chat", function(message) {
    $("#chat ul").append($("<li>").text(message));
  });

  socket.on("notice", function(message) {
    alert(message);
  });

  $("#chat form").submit(function() {
    var message = $(this).find("input[name='message']").val();

    socket.emit("chat", message);

    $(this).find("input[name='message']").val("");

    return false;
  });
});
