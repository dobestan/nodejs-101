var express = require("express");
var router = express.Router();


router.post("/", function(req, res, next) {
  // 공지를 실제로 해주고 싶다.
  req.io.emit("notice", req.body.notice);
  return res.status(200).send();
});


module.exports = router;
