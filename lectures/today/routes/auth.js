var express = require("express");
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require("../models/user");

var authMiddleware = require("../middlewares/auth");


router.route("/login/")
  .get(function(request, response) {
  })
  .post(
  );


router.route("/signup/")
  .get(function(request, response) {
  })
  .post(function(request, response, next) {
  });


router.get("/logout/", function(request, response) {
  return response.redirect("/");
});


router.get("/profile/", function(request, response) {
  return response.render("auth/profile");
});


// router.get("/auth/facebook/", passport.authenticate("facebook"));
//
//
// router.get("/auth/facebook/callback",
//   passport.authenticate("facebook", {failureRedirect: "/login/"}),
//   function (request, response) {
//     return response.redirect("/");
//   }
// )


module.exports = router;
