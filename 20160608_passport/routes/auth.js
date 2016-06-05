var express = require('express');
var router = express.Router();


router.get("/login", function(request, response) {
  return response.render("auth/login");
});


router.get("/signup", function(request, response) {
  return response.render("auth/signup");
});


module.exports = router;
