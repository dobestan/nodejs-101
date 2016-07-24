var path = require("path");

var httpRequest = require("request");
var express = require("express");

var router = express.Router();

var csv = require("./csv");


router.get("/", function(request, response) {
  return response.render(
    "home",
    {
      title: "Node.js 로 시작하는 웹 프로그래밍"
    }
  );
});


router.get("/watcha/", function(request, response) {
  httpRequest.get(
    "https://watcha.net/home/news.json?page=1&per=20",
    function(error, httpResponse, body) {
      var data = JSON.parse(body);

      return response.render("watcha", {
        news: data.news
      });
    }
  );
});


router.get("/zigbang/:roomId/", function(request, response) {
  var roomId = request.params.roomId;
  var zigbangApiUrl = "https://api.zigbang.com/v1/items?detail=true&item_ids=" + roomId;

  httpRequest.get(
    zigbangApiUrl,
    function(error, httpResponse, body) {
      var data = JSON.parse(body);

      return response.render("zigbang", {
        zigbang: data["items"][0]["item"]
      });
    }
  );
});


router.get("/api/:filename/", function(request, response) {
  var filename = request.params.filename;
  var filePath = path.join(__dirname, "csv", filename + ".csv");

  var data = csv(filePath);
  return response.json(data);
});


module.exports = router;
