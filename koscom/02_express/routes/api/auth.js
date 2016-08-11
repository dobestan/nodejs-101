var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var passport = require("passport");

var User = require("../../models/user");


router.route("/")
  .post(function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authenticate()(username, password, function(error, user) {
      if (error) return next(error);
      if (!user) return res.status(400).send({message: "유저 정보가 올바르지 않습니다."});
      var token = jwt.sign(user._doc, req.app.get("jwtSecret"));
      return res.json({token: token});
    });
  });


router.route("/verify/")
  .post(function(req, res, next) {
    var token = req.body.token; // FIXME: Authorization: Bearer ...

    jwt.verify(token, req.app.get("jwtSecret"), function(error, user) {
      if (error) return res.status(400).json(error);
      return res.status(200).json(user);
    });
  });


router.route("/secret/")
  .get(
    function(req, res, next) {
      console.log(req.headers.authorization);
      next();
    },
    passport.authenticate("jwt"),
    function(req, res, next) {
      return res.json({secret: "secret information"});
    }
  )


module.exports = router;
