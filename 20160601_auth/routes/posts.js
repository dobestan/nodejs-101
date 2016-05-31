var express = require("express");
var router = express.Router();

var Post = require("../models/post");


router.get("/", function(request, response) {
  Post.find({}, function(error, posts) {
    response.render(
      "posts/list",
      {
        "posts": posts
      }
    );
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
    if (error) response.send(error);

    return response.redirect("/posts/" + post._id);
  });
});


router.get("/new", function(request, response) {
  return response.render("posts/new");
});


router.get("/:postId", function(request, response) {
  var postId = request.params.postId;

  Post.findOne({_id: postId}, function(error, post) {
    if (error) response.send(error);
    return response.render(
      "posts/detail",
      {
        "post": post
      }
    )
  });
});


router.get("/:postId/edit", function(request, response) {
  var postId = request.params.postId;

  Post.findById(postId, function(error, post) {
    if (error) response.send(error);
    return response.render(
      "posts/edit",
      {
        "post": post
      }
    )
  });
});


router.post("/:postId/edit", function(request, response) {
  var postId = request.params.postId;

  var title = request.body.title;
  var content = request.body.content;

  Post.findById(postId, function(error, post) {
    if (error) response.send(error);
    post.title = title;
    post.content = content;

    post.save(function(error) {
      if (error) response.send(error);
    });

    return response.redirect("/posts/" + post._id);
  });
});



router.get("/:postId/delete", function(request, response) {
  var postId = request.params.postId;

  Post.findById(postId, function(error, post) {
    post.remove(function(error) {
      if (error) response.send(error);
      return response.redirect("/posts/");
    })
  });
});


module.exports = router;
