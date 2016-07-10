var express = require("express");
var router = express.Router();


// 1. Flash Message 를 생성하는 라우터
router.get("/create", function(request, response) {
  request.flash("hello", "Hello, World!"); // 일회성 Flash Message 가 생성됨
  return response.redirect("/flash/result/");
});


// 2. 생성된 Flash Message 를 볼 수 있는 라우터
router.get("/result", function(request, response) {
  // 여기에서 Flash Message 를 소비함.
  return response.send(JSON.stringify(request.flash("hello")));
});


module.exports = router;
