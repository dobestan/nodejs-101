var express = require("express");
var router = express.Router();

var User = require("../models/user");


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
  // FIXME: should validate user

  var user = new User({
    username: request.body.username,
    password: request.body.password,
    email: request.body.email,
    phonenumber: request.body.phonenumber
  });

  user.save(function(error, user) {
    if (error) throw error;
    return response.redirect("/");
  });
});



router.get("/logout/", function(request, response) {
  return response.redirect("/");
});


module.exports = router;