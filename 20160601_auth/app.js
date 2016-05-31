var express = require("express");
var path = require("path");


var app = express();

var User = require("./models/user");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.get("/", function(request, response) {
  response.render("home");
});


app.get("/users", function(request, response) {
  User.find({}, function(error, users) {
    return response.render(
      "users/list",
      {"users": users}
    );
  });
});


app.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
