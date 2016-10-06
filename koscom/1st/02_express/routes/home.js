var express = require("express");
var router = express.Router();  // => `function(req, res, next)`


router.get("/",
  // function(req, res, next) {
  //   console.log("This is home #1");
  //   next();
  // },
  // function(req, res, next) {
  //   console.log("This is home #2");
  //   next();
  // },
  function(req, res, next) {
    // 404 => Not Found
    // 500 => Internal Server Error
    return res.render("home");
  }
);


module.exports = router;
