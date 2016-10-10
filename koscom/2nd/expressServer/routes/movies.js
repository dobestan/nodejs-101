var express = require("express");
var router = express.Router();

var watcha = require("../utils/watcha");


router.get("/", function(req, res, next) {
  var search = req.query.search;   // "특정 텍스트", undefined

  watcha(1, 100, function(error, data) {
    if (error) return next(error);
    var movieElements = data.news;
    if (search) {
      movieElements = movieElements.filter(function(movieElement) {
        return movieElement.title.indexOf(search) >= 0;
      });
    }

    var context = {
      search: search,
      movieElements: movieElements
    };
    return res.render("movies", context);
  });
});


module.exports = router;
