var express = require("express");
var router = express.Router();


// cookie ( client ) - ______, sessionid
// session ( server ) - flash message, user(login/logout)
// message create => session flash 에 데이터를 추가
// {"success": "회원가입이 성공..."}
// message get => session flash 데이터를 모두 읽어온 다음에, 뷰에다가 뿌려주고 그리고 세션에서는 삭제

router.get("/", function(req, res, next) {
  // Flash
  // "success" => "회원가입이 성공적으로 되었습니다."
  // "error" => "비밀번호가 틀렸습니다."
  req.flash("success", "회원가입이 성공적으로 되었습니다.");
  req.flash("error", "비밀번호가 틀렸습니다."); // flash => setter

  return res.redirect("/flash/result/");
});


// "/flash/result/"
router.get("/result/", function(req, res, next) {
  // 실제로 가지고 있는 모든 Flash Message 를 출력
  return res.json(req.flash()); // flash => getter
});


module.exports = router;
