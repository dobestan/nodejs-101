$(document).ready(function() {

  var socket = io();

  socket.on("connect", function() {
    console.log("Socket is connected: " + socket.id);
  });

  socket.on("chat", function(chat) {
    $("#chat ul#history").append(
      $("<li>").text(chat.message)
    )
  });

  socket.on("disconnect", function() {
    console.log("Socket is disconnected");
  });


  var roomId = $("#chat").data("room-id") || "";
  socket.join(roomId);

  $("#chat form").submit(function() {
    var message = $(this).find("input[name='message']").val();

    socket.emit("chat", {message: message, roomId: roomId});

    $(this).find("input[name='message']").val("")
    return false;
  });
});
