var express = require('express');

var router = express.Router();


router.get("/", function(request, response) {
  response.send("<h1>Users List</h1>");
});


module.exports = router;
