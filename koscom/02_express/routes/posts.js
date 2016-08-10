var express = require("express");
var router = express.Router();

var Post = require("../models/post");


router.route("/")
  .get(function(req, res, next) {
    Post.find({}, function(error, posts) {
      return res.render("posts/list", {posts: posts});
    });
  });


module.exports = router;
