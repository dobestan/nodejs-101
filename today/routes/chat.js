var express = require("express");
var router = express.Router();


router.get("/", function(request, response, next) {
  return response.render("chat");
});


router.post("/notice/", function(request, response, next) {
  var message = request.body.message;
  request.io.emit("notice", message);
  return response.status(201).send();
});


module.exports = router;
