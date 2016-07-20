var http = require("http");


function homeRouter(request, response) {
  if (request.url === "/") {
    response.write("<h1>Home</h1>");
    response.end();
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
        response.write(data);
        response.end();
      });
    });
  }
}


module.exports.home = homeRouter;
module.exports.room = roomRouter;
