var express = require("express");
var router = express.Router();

var Movie = require("../models/movie");


router.get("/", function(request, response) {
  Movie.find({}, function(error, movies) {
    return response.render("movies", {movieItems: movies});
  });
});


module.exports = router;
