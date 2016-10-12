var express = require("express");
var router = express.Router();

var bcrypt = require("bcryptjs");
var User = require("../models/user");

var passport = require("passport");


router.route("/signup")
  .get(function(req, res, next) {
    return res.render("auth/signup");
  })
  .post(function(req, res, next) {
    var user = new User({
      username: req.body.username,
      password: req.body.password,
      // createdAt: new Date(),
      // updatedAt: new Date()
    });

    user.save(function(error) {
      if (error) next(error);
      req.flash("success", "성공적으로 회원가입 되었습니다.");
      return res.redirect("/");
    });
  })


router.route("/login")
  .get(function(req, res, next) {
    var next = req.query.next;
    var context = {next: next};
    return res.render("auth/login", context);
  })
  .post(
    passport.authenticate("local", {failureRedirect: '/login'}),  // passport-local Strategy
    function(req, res, next) {
      req.flash("success", "성공적으로 로그인 되었습니다.");
      return res.redirect("/");
    }
  );


router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback",
  passport.authenticate("facebook"),
  function(req, res, next) {
    req.flash("success", "페이스북 회원가입이 완료되었습니다.");
    return res.redirect("/");
  }
);


    // if (req.body.username === username && req.body.password === password) {
    //   req.session.user = user;
    //   req.flash("success", "성공적으로 로그인 되었습니다.");
    //   return res.redirect(next);
    // } else {
    //   req.flash("error", "계정 정보가 잘못되었습니다.");
    //   return res.redirect("/login");
    // }


router.route("/logout")
  .get(function(req, res, next) {
    delete req.session.user;
    req.flash("success", "성공적으로 로그아웃 되었습니다.");
    return res.redirect("/");
  })


router.route("/mypage")
  .get(
    require("../middlewares/auth").loginRequired(),
    function(req, res, next) {
      return res.render("mypage", {profile: req.session.user});
    }
  );


module.exports = router;
