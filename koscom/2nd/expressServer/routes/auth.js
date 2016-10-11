var express = require("express");
var router = express.Router();


router.route("/signup")
  .get(function(req, res, next) {
    return res.render("auth/signup");
  })
  .post(function(req, res, next) {
    req.flash("success", "성공적으로 회원가입 되었습니다.");
    return res.redirect("/");
  })


router.route("/login")
  .get(function(req, res, next) {
    return res.render("auth/login");
  })
  .post(function(req, res, next) {
    req.flash("success", "성공적으로 로그인 되었습니다.");
    return res.redirect("/");
  })


router.route("/logout")
  .get(function(req, res, next) {
    req.flash("success", "성공적으로 로그아웃 되었습니다.");
    return res.redirect("/");
  })


module.exports = router;
