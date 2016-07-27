var path = require("path");
var fs = require("fs");

var express = require("express");
var router = express.Router();


// users:list
router.get("/", function(request, response) {
  var data = fs.readFileSync(path.join(__dirname, "../db", "users.csv"), {encoding: "utf8"});
  var rows = data.split("\n");

  var users = [];
  rows.forEach(function(row) {
    var name = row.split(",")[0];
    var email = row.split(",")[1];
    var phonenumber = row.split(",")[2];

    var user = {
      name: name,
      email: email,
      phonenumber: phonenumber
    };

    users.push(user);
  });

  return response.render("users", {users: users});
});


// users:create
router.post("/", function(request, response) {
});


module.exports = router;
