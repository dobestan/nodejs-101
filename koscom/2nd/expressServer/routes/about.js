var express = require("express");
var router = express.Router();


router.get("/", function(req, res, next) {
  return res.send("about");
});


module.exports = router;
