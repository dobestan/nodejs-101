var express = require('express');

var router = express.Router();
var users = require("../users");


router.get("/", function(request, response) {
  var data = users.list()['users'];
  return response.render("users/list", {users: data});
});


router.get("/new", function(request, response) {
  return response.render("users/new");
});


router.post("/new", function(request, response) {
  var name = request.body.name;
  var email = request.body.email;

  users.create(name, email);
  return response.redirect("/users");
});


router.get("/:userId", function(request, response) {
  var userId = request.params.userId;
  var data = users.retrieve(userId);

  return response.render("users/detail", user=data);;
});

module.exports = router;
