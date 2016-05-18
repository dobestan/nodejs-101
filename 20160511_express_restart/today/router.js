// Routing 을 처리하는 자바스크립트 코드

var express = require("express");
var router = express.Router();

var fs = require("fs");
var path = require("path");


router.use(function trackRequestTimeAndURL(request, response, next) {
  console.log("User request to " + request.url + " on " + Date.now());
  next();
});


router.get("/", function(request, response) {
  // response.send("hello world");
  var animals = ["dog", "cat", "bird", "mouse"];
  response.render("home", {"animals": animals});
});


router.get("/users", function(request, response) {
  var users = [];

  // fs.readFile      - async
  // fs.readFileSync  - sync
  fs.readFile(path.join(__dirname, "users.csv"), function(error, data) {
    var lines = String(data).split("\n");

    for (var lineNumber in lines) {
      var line = lines[lineNumber];
      // line === "안수찬, 서울특별시 강남구 강남대로"
      var username = line.split(",")[0];
      var address = line.split(",")[1];

      var user = {
        "username": username,
        "address": address,
      };
      users.push(user);
    }

    response.send({"users": users});
  });
});


router.get("/:roomId", function(request, response) {
  var roomId = request.params.roomId;
  response.send("room detail on " + roomId);
});

module.exports = router;
