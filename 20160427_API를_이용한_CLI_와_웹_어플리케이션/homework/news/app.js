var express = require("express");


var app = express();


app.get("/", function(request, response) {
  response.send("hello world");
})

app.get("/:roomId", function(request, response) {
  response.send(request.params.roomId);
})

app.listen(3000);