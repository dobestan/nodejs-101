var http = require('http');


var app = http.createServer(function(request, response) {
  response.write("hello world");
  response.end();
}).listen(3000);


console.log("Server is listening on localhost:3000");
