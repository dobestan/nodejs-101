var express = require("express");
var router = express.Router();

var User = require("../../models/user");
var jwt = require("jsonwebtoken");
// User.authenticate()


// /api/auth/
router.post("/", function(req, res, next) {
  var authenticate = User.authenticate();
  authenticate(req.body.username, req.body.password, function(error, user) {
    if (error) return res.json(error);
    var secret = "KOSCOM Node.js";
    var token = jwt.sign(user._doc, secret);
    return res.json({token: token});
  });
});


router.post("/verify", function(req, res, next) {
  var token = req.body.token;

  jwt.verify(token, "KOSCOM Node.js", function(error, decoded) {
    if (error) return res.json(error);
    return res.json(decoded);
  });
});








module.exports = router;
