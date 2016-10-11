var express = require("express");
var router = express.Router();

var User = require("../models/user");


router.route("/signup")
  .get(function(req, res, next) {
    return res.render("auth/signup");
  })
  .post(function(req, res, next) {
    var user = new User({
      username: req.body.username,
      password: req.body.password,
      createdAt: new Date(),
      updatedAt: new Date()
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
  .post(function(req, res, next) {
    var username = "admin";
    var password = "1234";
    var user = {
      username: username,
      password: password,
      email: "admin@naver.com"
    };
    var next = req.body.next || "/";

    if (req.body.username === username && req.body.password === password) {
      req.session.user = user;
      req.flash("success", "성공적으로 로그인 되었습니다.");
      return res.redirect(next);
    } else {
      req.flash("error", "계정 정보가 잘못되었습니다.");
      return res.redirect("/login");
    }
  })


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
      return res.send("This is my page");
    }
  );


module.exports = router;
