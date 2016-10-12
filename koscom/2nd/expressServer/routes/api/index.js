var express = require("express");
var router = express.Router();

var postsRouter = require("./posts");


router.use("/posts", postsRouter);
// GET, POST /api/posts/


module.exports = router;
