var express = require("express");
var router = express.Router();


router.get("/", function(req, res, next) {
  return res.render("home", {name: "Suchan An"});
});


module.exports = router;
