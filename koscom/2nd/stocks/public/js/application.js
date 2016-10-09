(function() {
  $(document).ready(function() {
    var socket = io();

    socket.on("connect", function() {
      console.log("socket is connected", socket.id);
    });

    socket.on("disconnect", function() {
      console.log("socket is disconnected");
    });

    socket.on("stocks", function(stocks) {
      console.log(stocks);
    });
  });
})();
