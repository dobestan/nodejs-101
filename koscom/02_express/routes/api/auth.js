var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

var User = require("../../models/user");


router.route("/")
  .post(function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authenticate()(username, password, function(error, user) {
      if (error) return next(error);
      if (!user) return res.status(400).send({message: "유저 정보가 올바르지 않습니다."});
      var token = jwt.sign(user, "something secret key");
      return res.json({token: token});
    });
  });


module.exports = router;
