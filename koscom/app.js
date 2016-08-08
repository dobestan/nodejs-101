var path = require("path");
var http = require("http");
var csv = require("./csv");

var logger = require("./logger");
var router = require("./router");


var app = http.createServer(function(request, response) {
  // 1. logger
  logger(request, response);

  // 2. router
  router.homeRouter(request, response);
  router.aboutRouter(request, response);
  router.zigbangRouter(request, response);
  router.csvRouter(request, response);

  // 3. renderer
  // express - renderer (template engine)
});


app.listen(3000, function() {
  console.log("Server is running on localhost:3000");
});
