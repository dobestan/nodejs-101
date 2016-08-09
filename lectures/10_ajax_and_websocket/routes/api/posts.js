var express = require("express");
var router = express.Router();

var Post = require("../../models/post");


router.route("/")
  .get(function(request, response, next) {
    Post.find({}, function(error, posts) {
      return response.json(posts);
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
      return response.status(201).json("Successfully created");
    });
  });


router.param("postId", function(request, response, next, postId) {
  Post.findOne({_id: postId}, function(error, post) {
    if (error) return next(error);
    request.post = post;
    next();
  });
});


router.route("/:postId/")
  .get(function(request, response, next) {
    return response.json(request.post);
  })
  .patch(function(request, response, next) {
    var title = request.body.title || req.post.title;
    var content = request.body.content || req.post.content;

    request.post.title = title;
    request.post.content = content;

    request.post.save(function(error, post) {
      return response.status(204).send();
    });
  })
  .delete(function(request, response, next) {
    request.post.remove(function(error) {
      return response.status(204).send();
    });
  });


module.exports = router;
