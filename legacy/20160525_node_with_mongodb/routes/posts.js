var express = require('express');

var router = express.Router();


router.get("/", function(request, response) {
  request.db.get("posts").find({}, function(error, document) {
    return response.render(
      "posts/list",
      {"posts": document});
  });
});


router.post("/", function(request, response) {
  var title = request.body.title;
  var content = request.body.content;

  request.db.get("posts").insert({title: title, content: content, comments: []}, function(error, document) {
    if (error) console.log(error);
    return response.redirect("/posts/");
  });
});


router.get("/new", function(request, response) {
  return response.render(
    "posts/new"
  );
});


router.get("/:title", function(request, response) {
  var title = request.params.title;

  request.db.get("posts").find({title: title}, function(error, document) {
    return response.render("posts/detail", {post: document[0]});
  });
});


router.post("/:title/comments", function(request, response) {
  var title = request.params.title;
  var comment = request.body.content;

  request.db.get("posts").find({title: title}, function(error, document) {
    var post = document[0];
    post.comments.push(comment);

    request.db.get("posts").update({title: title}, {title: post.title, content: post.content, comments: post.comments}, function(error, document) {
      return response.redirect("/posts/" + post.title);
    });
  });
});


module.exports = router;
