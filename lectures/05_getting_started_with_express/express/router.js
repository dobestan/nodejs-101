var httpRequest = require("request");
var express = require("express");

var router = express.Router();


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


module.exports = router;
