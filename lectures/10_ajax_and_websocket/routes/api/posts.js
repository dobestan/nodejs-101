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


module.exports = router;
