var http = require('http');

var render = require('./renderer');


function home(request, response) {
  if (request.url === "/") {
    render("home", {}, response);
  }
}


function room(request, response) {
  var roomId = request.url.replace("/", "");
  if (roomId.length > 0) {
    // render("room", {}, response);

    var apiRequest = http.get("http://api.zigbang.com/v1/items?detail=true&item_ids=" + roomId, function(apiResponse) {
      var apiData = "";

      apiResponse.on("data", function(chunk) {
        apiData += chunk;
      });

      apiResponse.on("end", function() {
        try {
          var apiJsonData = JSON.parse(apiData);
          var roomInformation = apiJsonData.items[0].item;

          var apiValues = {
            'address': roomInformation.agent_address1,
            'deposit': roomInformation.deposit,
            'rent': roomInformation.rent,
            'image_url': roomInformation.images[0].url
          };

          render("room", apiValues, response);
        } catch (error) {
          response.write(error.message);
          response.end();
        }
      });
    });
  }
}


module.exports.home = home;
module.exports.room = room;
