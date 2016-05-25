var express = require('express');

var router = express.Router();


router.get("/", function(request, response) {
  response.render("users/list");
});


module.exports = router;
