var express = require("express");
var router = express.Router();

var Post = require("../models/post");


router.get("/posts/:postId/comments/", function(request, response) {
  var postId = request.params.postId;

  Post.findById(postId, function(error, post) {
    if (error) return response.json(error);
    return response.json(post.comments);
  });
});


router.post("/posts/:postId/comments/", function(request, response) {
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
      return response.status(201).json({message: "Successfully Created"});
    });
  });
});


module.exports = router;
