var express = require("express");
var router = express.Router();

var Post = require("../models/post");


router.route("/")
  .get(function(request, response, next) {
    Post.find({}, function(error, posts) {
      if (error) return next(error);
      return response.render("posts/list", {posts: posts});
    });
  })
  .post(function(request, response, next) {
  });


router.get("/new/", function(request, response) {
  return response.render("posts/new", {});
});


router.param("postId", function(request, response, next, postId) {
  Post.findOne({_id: postId}, function(error, post) {
    if (error) return next(error);
    request.post = post;
    next();
  });
});


router.get("/:postId/", function(request, response) {
  return response.render("posts/detail", {post: request.post});
});


module.exports = router;
