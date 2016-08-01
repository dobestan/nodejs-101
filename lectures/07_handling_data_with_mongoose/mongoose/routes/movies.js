var express = require("express");
var router = express.Router();

var Movie = require("../models/movie");


router.get("/", function(request, response) {
  var query = request.query.query;

  Movie.find({title: {$regex: ".*" + query + ".*"}}, function(error, movies) {
    return response.render("movies", {movieItems: movies});
  });
});


module.exports = router;
