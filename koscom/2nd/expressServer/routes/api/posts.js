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
      req.io.emit("notice", "신규 포스트가 등록되었습니다: " + post.title);
      return res.status(201).send("Successfully created");
    });
  });


module.exports = router;
