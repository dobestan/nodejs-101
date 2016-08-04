var express = require("express");
var router = express.Router();

var User = require("../models/user");

var authMiddleware = require("../middlewares/auth");


router.route("/login/")
  .all(authMiddleware.logoutRequired)
  .get(function(request, response) {
    return response.render("auth/login");
  })
  .post(function(request, response, next) {
    var username = request.body.username;
    var password = request.body.password;

    User.authenticate(username, password, function(error, user) {
      if (error) return next(error);

      request.session.user = user;
      request.flash("success", "성공적으로 로그인 되었습니다.");

      return response.redirect("/");
    });
  });


router.route("/signup/")
  .all(authMiddleware.logoutRequired)
  .get(function(request, response) {
    return response.render("auth/signup");
  })
  .post(function(request, response, next) {
    // FIXME: should validate user

    var user = new User({
      username: request.body.username,
      password: request.body.password,
      email: request.body.email,
      phonenumber: request.body.phonenumber
    });

    user.save(function(error, user) {
      if (error) return next(error);
      return response.redirect("/");
    });
  });


router.get("/logout/", function(request, response) {
  return response.redirect("/");
});


router.get("/profile/", authMiddleware.loginRequired, function(request, response) {
  return response.render("auth/profile");
});


module.exports = router;
