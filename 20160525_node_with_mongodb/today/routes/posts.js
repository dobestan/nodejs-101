var express = require('express');

var router = express.Router();


// Posts List
router.get("/", function(request, response) {
  request.db.get('posts').find({}, function(error, document) {
    if (error) response.send(error);
    return response.render("posts/list", {"posts": document});
  });
});


router.post("/", function(request, response) {
  var title = request.body.title;
  var content = request.body.content;
  var post = {
    'title': title,
    'content': content,
    'comments': []
  };

  request.db.get('posts').insert(post, function(error, document) {
    if (error) response.send(error);
    return response.redirect("/posts/");
  });
});


router.get("/new/", function(reqeust, response) {
  return response.render("posts/new");
});


// Posts Detail
router.get("/:title/", function(request, response) {
  var title = request.params.title;

  request.db.get('posts').find({'title': title}, function(error, document) {
    if (error) response.send(error);
    return response.render("posts/detail", {"post": document[0]});
    // find() 의 결과가 갯수에 상관없이, 리스트로 나오기 때문에
  });
});


router.post("/:title/comments/", function(request, response) {
  var title = request.params.title;

  // 기존 post json 에다가 comment 를 추가하자.
  var username = request.body.username;
  var content = request.body.content;
  var comment = {
    'username': username,
    'content': content
  };

  request.db.get('posts').find({'title': title}, function(error, document) {
    var post = document[0];
    post.comments.push(comment);

    request.db.get('posts').update({'title': title}, post, function(error, document) {
      if (error) response.send(error);
        return response.redirect("/posts/" + title);
    })
  });
});


module.exports = router;
