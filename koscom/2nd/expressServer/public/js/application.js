(function() {
  $(document).ready(function() {
    var socket = io();

    socket.on("connect", function() {
      console.log("Socket is connected: " + socket.id);
    });
  });
})();
