var express = require("express");
var router = express.Router();


router.get("/", function(request, response, next) {
  return response.render("chat");
});


module.exports = router;
