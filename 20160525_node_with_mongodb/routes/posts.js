var express = require('express');

var router = express.Router();


router.get("/", function(request, response) {
  request.db.get("posts").find({}, function(error, document) {
    return response.render(
      "posts/list",
      {"posts": document});
  });
});


module.exports = router;
