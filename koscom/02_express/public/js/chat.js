$(document).ready(function() {

  var socket = io();

  socket.on("connect", function() {
    console.log("Socket is connected: " + socket.id);
  });


  var roomId = $("#chat").data("room-id");
  alert(roomId);

  $("#chat form").submit(function() {
    var message = $(this).find("input[name='message']").val();
    alert(message);
    $(this).find("input[name='message']").val("")
    return false;
  });
});
