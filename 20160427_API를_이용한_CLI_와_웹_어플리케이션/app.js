var http = require('http');


var app = http.createServer(function(request, response) {
  if (request.url === "/") {
    response.write("home");
    response.end();
  }

  var roomId = request.url.replace("/", "");
  if (roomId.length > 0) {
    response.write(roomId);
    response.end();
  }
}).listen(3000);


console.log("Server is listening on localhost:3000");
