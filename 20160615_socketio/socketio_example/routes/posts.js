var express = require("express");
var router = express.Router();

var Post = require("../models/post");


router.get("/", function(request, response) {
  Post.find({}, function(error, posts) {
    if (error) return response.json(error);
    return response.render("posts/list", {"posts": posts});
  });
});


router.post("/", function(request, response) {
  var title = request.body.title;
  var content = request.body.content;

  var post = Post({
    title: title,
    content: content
  });

  post.save(function(error) {
    if (error) return response.json(error);
    return response.redirect("/posts/" + post._id + "/");
  });
});


router.get("/new/", function(request, response) {
  return response.render("posts/new");
});


router.get("/:postId/", function(request, response) {
  var postId = request.params.postId;

  Post.findById(postId, function(error, post) {
    if (error) return response.json(error);
    return response.render("posts/detail", {"post": post});
  });
});


router.post("/:postId/comments/", function(request, response) {
  var postId = request.params.postId;
  var content = request.body.content;

  Post.findById(postId, function(error, post) {
    if (error) return response.json(error);

    var comment = {
      content: content
    };
    post.comments.push(comment);
    post.save(function(error) {
      if (error) return response.json(error);
      return response.redirect("/posts/" + post._id + "/");
    });
  });
});


module.exports = router;
