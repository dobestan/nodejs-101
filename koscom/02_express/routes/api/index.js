var express = require("express");
var router = express.Router();

var postsRouter = require("./posts");
var authRouter = require("./auth");

var passport = require("passport");


router.use("/posts/", postsRouter);
router.use("/auth/", authRouter);


router.route("/profile/")
  .get(
    passport.authenticate("jwt"),
    function(req, res, next) {
      req.user.populate("posts", "title content", function(error, user) {
        return res.json(user);
      });
    }
  );


module.exports = router;
