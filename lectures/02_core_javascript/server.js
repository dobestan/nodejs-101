var http = require("http");


var app = http.createServer(function(request, response) {
  response.write("<h1>hello world</h1>");
  response.end();
});


app.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
