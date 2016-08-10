var express = require("express");
var router = express.Router();

var request = require("request");


router.get("/", function(req, res, next) {
  var maxDeposit = req.query.max_deposit;
  var minDeposit = req.query.min_deposit;

  var maxRent = req.query.max_rent;
  var minRent = req.query.min_rent;

  var apiUrl = "https://api.zigbang.com/v1/items?detail=true&item_ids=5432094&item_ids=5181619&item_ids=5454408&item_ids=5206680&item_ids=5203800&item_ids=5238646&item_ids=4774173&item_ids=5192740&item_ids=5238631&item_ids=5316580&item_ids=5174023&item_ids=5286895&item_ids=5183772&item_ids=5239588&item_ids=5298474&item_ids=5176158&item_ids=5454785&item_ids=5488497&item_ids=5183828&item_ids=5446484&item_ids=5330692&item_ids=5413388&item_ids=5436823&item_ids=5044544&item_ids=5488409&item_ids=5238623&item_ids=5170523&item_ids=5444342&item_ids=5447807&item_ids=5423830&item_ids=5184717";

  request.get(apiUrl, function(error, response, body) {
    var data = JSON.parse(body);
    data = data.items.map(function(item) { return item.item; });
    return res.render("zigbang/list", {rooms: data});
  });
});


module.exports = router;
