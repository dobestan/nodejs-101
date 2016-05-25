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

  request.db.get("posts").insert({title: title, content: content}, function(error, document) {
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


module.exports = router;
