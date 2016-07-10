var http = require('http');

var router = require('./router');


var app = http.createServer(function(request, response) {
  router.home(request, response);
  router.room(request, response);
}).listen(3000);


console.log("Server is listening on localhost:3000");
