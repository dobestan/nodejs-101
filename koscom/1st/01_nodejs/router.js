var path = require("path");
var httpRequest = require("request");

var csv = require("./csv");
var renderer = require("./renderer");


function homeRouter(request, response) {
  if (request.url == "/") {
    return renderer(request, response, "home", {});
  }
}


function aboutRouter(request, response) {
  if (request.url == "/about") {
    return renderer(request, response, "about", {});
  }
}


function zigbangRouter(request, response) {
  if (request.url.startsWith("/zigbang")) {
    var roomId = request.url.replace("/zigbang/", "");
    var apiUrl = "https://api.zigbang.com/v1/items?detail=true&item_ids=" + roomId;

    httpRequest.get(apiUrl, function(error, httpResponse, body) {
      var zigbangData = JSON.parse(body);
      var deposit = zigbangData["items"][0]["item"]["deposit"];
      var rent = zigbangData["items"][0]["item"]["rent"];
      var address = zigbangData["items"][0]["item"]["agent_address1"];
      var image_url = zigbangData["items"][0]["item"]["profile_url"];

      var context = {
        deposit: deposit,
        rent: rent,
        address: address,
        image_url: image_url
      }

      return renderer(request, response, "zigbang", context);
    });
  }
}


function csvRouter(request, response) {
  if (request.url.startsWith("/csv")) {
    var csvFilename = request.url.replace("/csv/", "") + ".csv";
    var csvFilepath = path.join(__dirname, "csv", csvFilename);
    var data = csv.readCsv(csvFilepath);

    response.write(JSON.stringify(data));
    response.end();
  }
}


module.exports.homeRouter = homeRouter;
module.exports.aboutRouter = aboutRouter;
module.exports.zigbangRouter = zigbangRouter;
module.exports.csvRouter = csvRouter;
