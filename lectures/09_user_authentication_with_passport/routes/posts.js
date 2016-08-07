var express = require("express");
var router = express.Router();

var Post = require("../models/post");


router.get("/", function(request, response, next) {
  Post.find({}, function(error, posts) {
    if (error) return next(error);
    return response.render("posts/list", {posts: posts});
  });
});


module.exports = router;
