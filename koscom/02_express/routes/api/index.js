var express = require("express");
var router = express.Router();

var postsRouter = require("./posts");


router.use("/posts/", postsRouter);


module.exports = router;
