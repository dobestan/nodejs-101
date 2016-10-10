var express = require("express");
var router = express.Router();

var zigbang = require("../utils/zigbang");


router.get("/:roomId", function(req, res, next) {
  var roomId = req.params.roomId;
  zigbang(roomId, function(error, data) {
    if (error) return res.render("rooms/error", error);
    return res.render("rooms/detail", data);
  });
});


module.exports = router;
