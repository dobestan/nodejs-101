var express = require("express");
var router = express.Router();

var httpRequest = require("request");


router.get("/", function(request, response) {
  var watchaApiUrl = "https://watcha.net/home/news.json?page=1&per=20";
  httpRequest(watchaApiUrl, function(error, httpResponse, body) {
    var data = JSON.parse(body);
    return response.render("watcha", {newsItems: data.news});
  });
});


module.exports = router;
