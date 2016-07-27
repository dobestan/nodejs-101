var express = require("express");
var router = express.Router();

var httpRequest = require("request");


router.get("/", function(request, response) {
  var query = request.query.query;

  var watchaApiUrl = "https://watcha.net/home/news.json?page=1&per=20";
  httpRequest(watchaApiUrl, function(error, httpResponse, body) {
    var data = JSON.parse(body);
    var newsItems = data.news;

    if (query) {
      var matchedNewsItems = [];

      newsItems.forEach(function(newsItem) {
        if (newsItem.title.indexOf(query) > -1) {
          matchedNewsItems.push(newsItem);
        }
      });

      newsItems = matchedNewsItems;
    }

    return response.render("watcha", {newsItems: newsItems, query: query});
  });
});


module.exports = router;
