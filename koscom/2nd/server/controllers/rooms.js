var http = require("http");
var renderer = require("../renderer");


module.exports = function(req, res) {
  var roomId = req.url.replace("/rooms/", "").replace("/", "");
  var apiUrl = "http://api.zigbang.com/v1/items?detail=true&item_ids=" + roomId;

  http.get(apiUrl, function(response) {
    var data = "";

    response.on("data", function(chunk) {
      data += chunk;
    });

    response.on("end", function() {
      data = JSON.parse(data);  // JSON Text => Object
      var roomContext = {
        deposit: data.items[0].item.deposit,
        rent: data.items[0].item.rent,
        imageUrl: data.items[0].item.profile_url,
        address: data.items[0].item.agent_address1
      };

      var content =renderer("room", roomContext);
      res.write(content);
      res.end();
    });
  });
}
