var express = require('express');


var router = express.Router();


router.get('/', function(request, response) {
  response.json(request.query);
});


router.post('/', function(request, response) {
  response.json(request.body);
});


module.exports = router;
