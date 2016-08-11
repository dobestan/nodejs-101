var express = require("express");
var router = express.Router();


router.route("/")
  .get(function(req, res, next) {
    return res.render("chats/list");
  })


router.route("/:roomId/")
  .get(function(req, res, next) {
    var roomId = req.params.roomId;
    return res.render("chats/detail", {roomId: roomId});
  });


module.exports = router;
