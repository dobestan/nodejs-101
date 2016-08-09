var express = require("express");
var router = express.Router();

var request = require("request");


// "/watcha/" + "/" => "/watcha/"
router.get("/", function(req, res, next) {
  var search = req.query.search;

  var apiUrl = "https://watcha.net/home/news.json?page=1&per=50";
  request.get(apiUrl, function(error, response, body) {
    var data = JSON.parse(body);
    var newsItems = data["news"];

    if (search) {
      newsItems = newsItems.filter(function(newsItem) {
        return newsItem.title.indexOf(search) > -1
      });

      // Lambda Operator - map, filter, reduce, ...
      // var matchedNewsItems = [];
      //
      // newsItems.forEach(function(newsItem) {
      //   if (newsItem.title.indexOf(search) > -1) {
      //     matchedNewsItems.push(newsItem);
      //   }
      // });
      //
      // newsItems = matchedNewsItems;
    }

    return res.render("watcha", {newsItems: newsItems, search: search});
  });
});


module.exports = router;
