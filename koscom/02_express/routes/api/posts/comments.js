var express = require("express");
var router = express.Router();


router.param("commentId", function(req, res, next, commentId) {
  req.comment = req.post.comments.id(commentId);
  if (!req.comment) return res.status(404).send();  // NOT FOUND
  next();
});


// "api/posts/12345/comments/ GET, POST
// 5 => List, Detail, Create, Update, Destroy
router.route("/")

  // posts:list => comments: [...]
  // posts:detail:comments:list => [...]
  .get(function(req, res, next) {
    return res.json(req.post.comments);
  })

  .post(function(req, res, next) {
    var content = req.body.content;
    var comment = {
      content: content
    };

    req.post.comments.push(comment);
    req.post.save(function(error, post) {
      // 1. Post, Comment => 201 CREATED
      // 2. Post ( update ) => 200 OK, 204 NO CONTENT
      return res.status(201).send();
    });
  });


router.route("/:commentId/")
  .get(function(req, res, next) {
    return res.json(req.comment);
  })
  .patch(function(req, res, next) {
    var content = req.body.content || req.comment.content;
    req.comment.content = content;
    req.post.save(function(error, post) {
      return res.status(204).send();
    });
  })
  .delete(function(req, res, next) {
    req.comment.remove();
    req.post.save(function(error, post) {
      return res.status(204).send();
    });
  });


module.exports = router;
