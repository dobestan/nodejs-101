var http = require("http");

var render = require("./renderer");


function homeRouter(request, response) {
  if (request.url === "/") {
    render("home", {}, response);
  }
}


function roomRouter(request, response) {
  var roomId = request.url.replace("/", "");
  if (roomId.length > 0) {
    var zigbangApiUrl = "http://api.zigbang.com/v1/items?detail=true&item_ids=" + roomId;
    http.get(zigbangApiUrl, function(apiResponse) {
      var data = "";

      apiResponse.on("data", function(chunk) {
        data += chunk;
      });

      apiResponse.on("end", function() {
        var zigbangData = JSON.parse(data);

        try {
          var zigbangItem = zigbangData["items"][0]["item"];

          var context = {
            deposit: zigbangItem["deposit"],
            rent: zigbangItem["rent"],
            address: zigbangItem["agent_address1"],
            imageUrl: zigbangItem["profile_url"]
          };

          render("room", context, response);
        } catch (error) {
          var context = {
            error: error
          };
          render("error", context, response);
        }
      });
    });
  }
}


module.exports.home = homeRouter;
module.exports.room = roomRouter;
