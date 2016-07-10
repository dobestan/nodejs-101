var express = require('express');

var router = express.Router();


// Users List ( R )
router.get("/", function(request, response) {
  request.db.get('users').find({}, function(error, document) {
    if (error) response.send(error);
    return response.json(document);
  })
});


// Users Create ( C )
// HTTP Method => POST => Create
router.post("/", function(request, response) {
  var username = request.body.username;
  var email = request.body.email;
  var content = {
      'username': username,
      'email': email
  };

  request.db.get('users').insert(content, function(error, document) {
    if (error) response.send(error);
    response.send("created");
  });
});


// Users Detail ( R )
router.get("/:username/", function(request, response) {
  var username = request.params.username;

  request.db.get('users').find({'username': username}, function(error, document) {
    if (error) response.send(error);
    return response.json(document);
  });
});


// Users Update/Delete
// POST => PATCH, DELETE ( HTTP Method )
router.patch("/:username/", function(request, response) {
  var username = request.params.username;
  var email = request.body.email;  // POST

  // 1. find, 2. replace, 3. callback
  request.db.get('users').update({'username': username}, {'username': username, 'email': email}, function(error, document) {
    if (error) response.send(error);
    return response.send("updated");
  });
});


// Users Destroy ( DELETE )
router.delete("/:username/", function(request, response) {
  var username = request.params.username;

  request.db.get('users').remove({'username': username}, function(error, document) {
    if (error) response.send(error);
    return response.send("deleted");
  });
});


module.exports = router;
