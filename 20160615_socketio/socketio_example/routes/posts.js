var express = require("express");
var router = express.Router();


router.get("/", function(request, response) {
  return response.render("posts/list");
});


router.get("/new/", function(request, response) {
  return response.render("posts/list");
});


module.exports = router;
