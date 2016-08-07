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
    var title = request.body.title;
    var content = request.body.content;

    var post = new Post({
      title: title,
      content: content
    });

    post.save(function(error, post) {
      if (error) return next(error);
      return response.redirect("/posts/");
    });
  });


router.get("/new/", function(request, response) {
  return response.render("posts/new", {});
});


module.exports = router;
