var express = require("express");
var router = express.Router();


router.get("/login/", function(request, response) {
  return response.render("auth/login");
});


router.post("/login/", function(request, response) {
  return response.send("login");
});


router.get("/signup/", function(request, response) {
  return response.render("auth/signup");
});


router.post("/signup/", function(request, response) {
  return response.send("signup");
});



router.get("/logout/", function(request, response) {
  return response.redirect("/");
});


module.exports = router;
