var express = require("express");
var router = express.Router();


// POSTMAN ( getpostman.com )

router.get("/", function(req, res, next) {
  // GET - request.query
  return res.json(req.query);
  // {hello: "world"}
});



// http.get()
router.post("/", function(req, res, next) {
  return res.json(req.body);
});

// watcha 검색 기능 구현하기: `"부산행 재밌습니다.".indexOf("____") > -1` 활용


module.exports = router;
