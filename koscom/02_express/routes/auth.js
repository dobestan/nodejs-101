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

    // username, password 체크
    // User Model
    User.findOne({username: username}, function(error, user) {
      if (error) return next(error);
      if (!user) {
        req.flash("error", "일치하는 username 이 없습니다.");
        return res.redirect("/login/");
      }

      if ( user.password === password ) {
        req.flash("success", "성공적으로 로그인 되었습니다.");
        // FIXME: session 에다가 user 정보 저장하기
        return res.redirect("/");
      } else {
        req.flash("error", "비밀번호가 일치하지 않습니다.");
        return res.redirect("/login/");
      }
    });
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

      // FIXME: password raw text 가 아니라, 암호화된 텍스트 ( 복호화가 불가능한 )
      req.flash("success", "성공적으로 회원가입 되었습니다.");
      return res.redirect("/");
    });
  });


router.route("/logout")
  .get


module.exports = router;