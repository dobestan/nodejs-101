var express = require('express');

var router = express.Router();


router.get("/", function(request, response) {
  request.db.get("users").find({}, function(error, document) {
    return response.render("users/list", users=document);
  });
});


router.get("/:username", function(request, response) {
  var username = request.params.username;

  request.db.get("users").find({username: username}, function(error, document) {
    return response.render("users/detail", user=document[0]);
  });
});


module.exports = router;
