var express = require('express');

var router = express.Router();


router.get('/', function(request, response) {
  response.send("users list");
});


module.exports = router;
