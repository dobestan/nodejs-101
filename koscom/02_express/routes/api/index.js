var express = require("express");
var router = express.Router();

var postsRouter = require("./posts");
var authRouter = require("./auth");


router.use("/posts/", postsRouter);
router.use("/auth/", authRouter);


module.exports = router;
