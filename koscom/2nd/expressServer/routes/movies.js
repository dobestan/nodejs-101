var express = require("express");
var router = express.Router();

var watcha = require("../utils/watcha");


router.get("/", function(req, res, next) {
  watcha(1, 100, function(error, data) {
    var context = {
      movieElements: data.news
    };
    return res.render("movies", context);
  });
});


module.exports = router;
