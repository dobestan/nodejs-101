var express = require("express");
var router = express.Router();


router.get("/", function(request, response) {
  return response.send("hello world");
});


router.post("/", function(request, response) {
  return response.send("hello world - post");
});


module.exports = router;
