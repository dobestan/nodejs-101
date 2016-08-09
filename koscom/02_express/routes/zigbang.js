var express = require("express");
var router = express.Router();

var request = require("request");


// "/zigbang/:roomId/"
router.get("/:roomId/", function(req, res, next) {
  var roomId = req.params.roomId;
  var apiUrl = "https://api.zigbang.com/v1/items?detail=true&item_ids=" + roomId;

  request.get(apiUrl, function(error, response, body) {
    var data = JSON.parse(body); // data => javascript Object

    var deposit = data["items"][0]["item"]["deposit"];
    var rent = data["items"][0]["item"]["rent"];
    var address = data["items"][0]["item"]["agent_address1"];
    var image_url = data["items"][0]["item"]["profile_url"];

    var context = {
      deposit: deposit,
      rent: rent,
      address: address,
      image_url: image_url
    };

    return res.render("zigbang", context);
  });
});


module.exports = router;
