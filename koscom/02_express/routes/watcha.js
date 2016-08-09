var express = require("express");
var router = express.Router();

var request = require("request");


// "/watcha/" + "/" => "/watcha/"
router.get("/", function(req, res, next) {
  var apiUrl = "https://watcha.net/home/news.json?page=1&per=50";
  request.get(apiUrl, function(error, response, body) {
    var data = JSON.parse(body);

    return res.render("watcha", {newsItems: data["news"]});
  });
});


module.exports = router;
