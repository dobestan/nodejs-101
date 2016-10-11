var express = require("express");
var router = express.Router();


router.get("/", function(req, res, next) {
  req.flash("success", "회원가입이 성공적으로 되었습니다.");
  req.flash("error", "비밀번호가 올바르지 않습니다.");
  return res.redirect("/flash/result/");
});


router.get("/result", function(req, res, next) {
  return res.json(req.flash());
});

// router.route("/")
//   .get(function(req, res, next) {
//     return res.json(req.flash("new message"));
//   })
//   .post(function(req, res, next) {
//     var content = req.body.content;
//     req.flash("new message", content);
//     return res.status(201).send("successfully created");
//   });


module.exports = router;
