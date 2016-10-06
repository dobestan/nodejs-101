var express = require("express");
var router = express.Router();
var passport = require("passport");

var Post = require("../../../models/post");

var commentsRouter = require("./comments");


router.param("postId", function(req, res, next, postId) {
  Post.findById(postId, function(error, post) {
    if (error) return next(error); // error handling mid
    req.post = post;
    next();
  });
});


router.route("/")

  .get(function(req, res, next) {
    Post.find({}).populate("_owner").exec(function(error, posts) {
      if (error) return res.status(500).send(error.message);
      return res.json(posts);
    })
  })

  .post(
    // passport.authenticate("jwt"),
    function(req, res, next) {
      var title = req.body.title;
      var content = req.body.content;

      var post = new Post({
        title: title,
        content: content,
        // _owner: req.user._id
      });

      post.save(function(error, post) {
        // 201 CREATED
        // req.user.posts.push(post);
        // req.user.save(function(error, user) {
        return res.status(201).send("Successfully created");
        // });
      });
    }
  );


router.route("/:postId/")

  .get(function(req, res, next) {
    return res.status(200).json(req.post);
  })

  .patch(function(req, res, next) {
    req.post.title = req.body.title || req.post.title;
    req.post.content = req.body.content || req.post.content;

    req.post.save(function(error, post) {
      return res.status(204).send();
    });
  })

  .delete(function(req, res, next) {
    req.post.remove(function(error) {
      return res.status(204).send();
    })
  });



router.use("/:postId/comments/", commentsRouter);


module.exports = router;
