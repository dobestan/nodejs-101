var express = require("express");
var router = express.Router();

var Post = require("../models/post");


router.get("/posts/:postId/comments/", function(request, response) {
});


router.post("/posts/:postId/comments/", function(request, response) {
});


module.exports = router;
