var express = require("express");
var router = express.Router();

var jwt = require("jsonwebtoken");
var User = require("../../models/user");
var passport = require("passport");


// POST "/api/auth/" ( username, password ) => {"token" ____}
router.route("/")
  .post(function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var authenticate = User.authenticate();
    authenticate(username, password, function(error, user) {
      if (error) return res.status(500).send(error.message);
      if (!user) return res.status(400).send();

      var token = jwt.sign(user._doc, require("../../config").jwtSecret);
      console.log(token);
      // user => token ... ( jwt )
      return res.status(200).json({token: token});
    });
  });


router.route("/verify/")
  .post(function(req, res, next) {
    var token = req.body.token; // HTTP Body => HTTP Header
                                // 사실상의 표준
    jwt.verify(token, "dkstncks", function(error, decoded) {
      if (error) return res.status(400).send(error.message);
      return res.status(200).json(decoded);
    });
  });


function apiLoginRequired() {
  return function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    // Authorization: Bearer ______________________; ______
    // Authorization: JWT ______________________; _____

    if (!token) return res.status(401).send("token required");
    jwt.verify(token, require("../../config").jwtSecret, function(error, decoded) {
      if (error) return res.status(400).send(error.message);
      next();
    });
  }
}


router.route("/secret/")
  .get(
    passport.authenticate("jwt"),
    function(req, res, next) {
      return res.send("very secret info");
    }
  );


module.exports = router;
