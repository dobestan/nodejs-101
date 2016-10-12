var express = require("express");
var router = express.Router();


router.get("/", function(req, res, next) {
  // Posts List 를 뿌려주는 페이지
  // ( 직방의 매물정보 뿌려주는 페이지 )
  return res.render("posts/list");
});


module.exports = router;
