var express = require("express");
var router = express.Router();

var Post = require("../../models/post");


router.route("/")
  .get(function(request, response, next) {
    Post.find({}, function(error, posts) {
      return response.json(posts);
    });
  });


module.exports = router;
