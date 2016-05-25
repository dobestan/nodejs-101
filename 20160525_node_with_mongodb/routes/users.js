var express = require('express');

var router = express.Router();


router.get('/', function(request, response) {
  request.db.get("users").find({}, function(error, document) {
    if (error) console.log(error);
    response.send(document);
  });
});


router.get('/:userId', function(request, response) {
  var userId = Number(request.params.userId);

  request.db.get("users").find({'userId': userId}, function(error, document) {
    if (error) console.log(error);
    response.send(document);
  });
});


module.exports = router;
