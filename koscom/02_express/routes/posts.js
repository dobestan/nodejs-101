var express = require("express");
var router = express.Router();

var Post = require("../models/post");

var authMiddleware = require("../middlewares/auth");


router.route("/")

  .get(function(req, res, next) {
    Post.find({}, function(error, posts) {
      return res.render("posts/list", {posts: posts});
    });
  })

  .post(function(req, res, next) {
    var title = req.body.title;
    var content = req.body.content;

    var post = Post({
      title: title,
      content: content
    });
    post.save(function(error, post) {
      req.flash("success", "포스트가 성공적으로 등록되었습니다.");
      return res.redirect("/posts/");
    })
  });


router.route("/new/")
  .get(
    authMiddleware.loginRequired,
    function(req, res, next) {
      return res.render("posts/new");
    }
  );


module.exports = router;
