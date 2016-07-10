var express = require("express");
var router = express.Router();


router.get("/", function(request, response) {
  // request.flash("success", "홈에 정상적으로 들어왔습니다.");
  // request.flash("error", "에러는 이런식으로 나게 됩니다.");
  return response.render("home");
});


module.exports = router;
