var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var https = require("https");


var app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(request, response) {
  var search = request.query.search;
  console.log(search);

  var apiResponse = https.get("https://watcha.net/home/news.json?page=1&per=50", function(apiResponse) {
    var apiData = "";

    apiResponse.on("data", function(chunk) {
      apiData += chunk;
    });

    apiResponse.on("end", function() {
      var apiJsonData = JSON.parse(apiData);

      // Search Feature
      var newsData = []
      if (search) {
        apiJsonData.news.forEach(function(newsItem){
          if (newsItem.title.indexOf(search) > -1) {
            newsData.push(newsItem);
          }
        });
      }
      else {
        newsData = apiJsonData.news;
      }

      return response.render(
        "home", {
          news: newsData,
          search: search
        }
      );
    });
  });
});


app.listen(3000, function() {
  console.log("Watcha server is listening on localhost:3000");
});
