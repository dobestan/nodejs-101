var http = require("http");

var router = require("./router");


var app = http.createServer(function(request, response) {
  router.home(request, response);
  router.room(request, response);
});


app.listen(3000, function() {
  console.log("Server is running");
});
