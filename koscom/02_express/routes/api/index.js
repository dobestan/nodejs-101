var express = require("express");
var router = express.Router();

var postsRouter = require("./posts");
var authRouter = require("./auth");

var passport = require("passport");


router.use("/posts/", postsRouter);
router.use("/auth/", authRouter);


router.route("/profile/")
  .all(passport.authenticate("jwt"))
  .get(function(req, res, next) {
    return res.json(req.user);
  });


module.exports = router;
