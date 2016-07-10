var express = require("express");
var router = express.Router();

var users = require("../../users");



router.get("/", function(request, response) {
  var data = users.list();
  response.json(data);
});


router.get("/:userId", function(request, response) {
  var userId = request.params.userId;
  var data = users.retrieve(userId);
  response.json(data);
});


module.exports = router;
