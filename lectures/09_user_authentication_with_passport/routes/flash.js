var express = require("express");
var router = express.Router();


router.get("/", function(request, response) {
  request.flash("hello", "world");
  request.flash("node.js", "is awesome");

  return response.redirect("/flash/result/");
});


router.get("/result/", function(request, response) {
  return response.json(request.flash());
});


module.exports = router;
