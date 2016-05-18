var express = require("express");
var fs = require("fs");


var router = express.Router();


router.get("/", function(request, response) {
  response.render("home")
});


router.get("/users", function(request, response) {
  fs.readFile("./users.csv", function(err, content) {
    var lines = String(content).split("\n");
    var users = []

    for (var index in lines) {
      var username = lines[index].split(",")[0];
      var address = lines[index].split(",")[1];

      users.push({"username": username, "address": address});
    }

    response.set("Content-Type", "text/json");
    response.send({"users": users});
  });
});


router.get("/:roomId", function(request, response) {
  response.send(request.params.roomId);
});





module.exports = router;
