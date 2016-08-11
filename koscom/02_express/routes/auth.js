var express = require("express");
var router = express.Router();

var User = require("../models/user");


router.route("/login/")

  .get(function(req, res, next) {
    return res.render("auth/login");
  })

  .post(function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    return res.send("login");
  });


router.route("/signup/")

  .get(function(req, res, next) {
    return res.render("auth/signup");
  })

  .post(function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var passwordConfirmation = req.body.password_confirmation;

    // password validation
    if ( password !== passwordConfirmation ) {
      req.flash("error", "입력하신 두 비밀번호가 일치하지 않습니다.");
      return res.redirect("/signup/");
    }

    var user = new User({
      username: username,
      password: password  // FIXME: password should be hashed
    });

    user.save(function(error, user) {
      if (error) return next(error);

      req.flash("success", "성공적으로 회원가입 되었습니다.");
      return res.redirect("/");
    });
  });


router.route("/logout")
  .get


module.exports = router;
