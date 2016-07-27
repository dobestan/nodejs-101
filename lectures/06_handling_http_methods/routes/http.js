var express = require("express");
var router = express.Router();


router.get("/", function(request, response) {
  var data = request.query;
  return response.send(data);
});


router.post("/", function(request, response) {
  var data = request.body;
  return response.send(data);
});


module.exports = router;
