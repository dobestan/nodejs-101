var express = require("express");
var router = express.Router();  // => `function(req, res, next)`


router.get("/", function(req, res, next) {
  var animals = ["dog", "cat", "bird", "cow"];

  return res.render("home", {animals: animals});
});


module.exports = router;
