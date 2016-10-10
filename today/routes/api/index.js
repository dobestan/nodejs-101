var express = require("express");
var router = express.Router();

var postsApiRouter = require("./posts");


router.use("/posts/", postsApiRouter);


module.exports = router;
