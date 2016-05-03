var express = require("express");


var router = express.Router();


router.use(function requestTimeLog(request, response, next) {
  console.log("request " + request.url + " on " + Date.now());
  next();
});


router.get('/', function(request, response) {
  response.send("hello world");
});

router.get('/:roomId', function(request, response) {
  var roomId = request.params.roomId;
  response.send(roomId);
});


module.exports = router;
