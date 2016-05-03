var express = require("express");


var router = express.Router();


router.get('/', function(request, response) {
  response.send("hello world");
});


module.exports = router;
