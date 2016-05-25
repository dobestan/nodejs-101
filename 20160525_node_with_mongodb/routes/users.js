var express = require('express');

var router = express.Router();


router.get('/', function(request, response) {
  request.db.get("users").find({}, function(error, document) {
    if (error) console.log(error);
    response.send(document);
  });
});


router.post('/', function(request, response) {
  var username = request.body.username;
  var age = Number(request.body.age);
  var content = {
    "username": username,
    "age": age
  }

  request.db.get("users").insert(content, function(error, document) {
    if (error) {
      response.send("Error");
    }

    response.send("Created");
  });
});


router.get('/:username', function(request, response) {
  var username = request.params.username;

  request.db.get("users").find({'username': username}, function(error, document) {
    if (error) console.log(error);
    response.send(document);
  });
});


module.exports = router;
