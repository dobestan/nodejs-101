var express = require("express");
var router = express.Router();


router.get("/", function(request, response) {
  return response.send("home");
});


module.exports = router;
