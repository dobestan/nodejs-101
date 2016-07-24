var express = require("express");

var router = express.Router();


router.get("/", function(request, response) {
  return response.render(
    "home",
    {
      title: "Node.js 로 시작하는 웹 프로그래밍"
    }
  );
});


module.exports = router;
