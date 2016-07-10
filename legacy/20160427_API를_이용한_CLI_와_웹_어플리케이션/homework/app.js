var fs = require("fs");
var http = require("http");
var https = require("https");


var app = http.createServer(function(request, response) {
  var apiRequest = https.get("https://watcha.net/home/news.json?page=2&per=10", function(apiResponse) {
    var apiData = "";

    apiResponse.on("data", function(chunk) {
      apiData += chunk;
    });

    apiResponse.on("end", function() {
      var apiJsonData = JSON.parse(apiData);
      var news= apiJsonData.news;

      var homeContent = fs.readFileSync("./templates/home.html", "utf8");
      var baseNewsContent = '\
        <div>\
          <img src="{{ image_url }}">\
          <a href="{{ detail_url }}" target="_blank">상세페이지 바로가기</a>\
          <p>\
            {{ content }}\
          <p>\
        </div>\
      '

      var newsContent = "";
      news.forEach(function(newsDetail) {
        var newsDetailContent = baseNewsContent.replace("{{ image_url }}", newsDetail.image);
        newsDetailContent = newsDetailContent.replace("{{ detail_url }}", newsDetail.detail_url);
        newsDetailContent = newsDetailContent.replace("{{ content }}", newsDetail.content);

        newsContent += newsDetailContent;
      });

      homeContent = homeContent.replace("{{ news }}", newsContent);

      response.write(homeContent);
      response.end();
    });
  });
}).listen(3000);


console.log("Server is listening on localhost:3000");
