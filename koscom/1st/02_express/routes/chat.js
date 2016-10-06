var express = require("express");
var router = express.Router();


router.route("/")
  .get(function(req, res, next) {
    return res.render("chat")
  });


module.exports = router;
