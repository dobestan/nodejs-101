var express = require("express");
var router = express.Router();

var Post = require("../../models/post");


// "/posts/"
router.route("/")
  .get(function(req, res, next) {
    Post.find({}, function(error, posts) {
      return res.json(posts);
    });
  })
  .post(function(req, res, next) {
    var post = new Post({
      title: req.body.title,
      content: req.body.content
    });

    post.save(function(error) {
      if (error) return res.json(error);
      return res.status(201).send("Successfully created");
    });
  });


module.exports = router;
