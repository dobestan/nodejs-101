var express = require("express");
var path = require("path");


var app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.get("/", function(request, response) {
  response.render("home");
});


app.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
