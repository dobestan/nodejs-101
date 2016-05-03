var express = require("express");


var router = express.Router();


router.get('/', function(request, response) {
  response.send("hello world");
});

router.get('/:roomId', function(request, response) {
  var roomId = request.params.roomId;
  response.send(roomId);
});


module.exports = router;
