


var express = require("express");
var router = express.Router();


router.get("/", function(req, res, next) {
  return res.json(req.query);
});


router.post("/", function(req, res, next) {
  return res.send("POST");
});


module.exports = router;
