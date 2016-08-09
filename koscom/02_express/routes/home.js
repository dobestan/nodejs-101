var express = require("express");
var router = express.Router();  // => `function(req, res, next)`


router.get("/", function(req, res, next) {

  var error = new Error("Home 이 마음에 들지 않습니다.");
  // error.status = 401;
  // 401 Unauthorized
  if (error) { return next(error); }

  // 404 => Not Found
  // 500 => Internal Server Error

  return res.render("home");
});


module.exports = router;
