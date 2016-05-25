var express = require('express');

var router = express.Router();


router.get('/', function(request, response) {
  request.db.get("users").find({}, function(error, document) {
    if (error) console.log(error);
    response.send(document);
  });
});


module.exports = router;
