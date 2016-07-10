var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var https = require("https");


// app
var app = express();

// views => 우리가 HTML/PUG 파일을 관리할 폴더
app.set("views", path.join(__dirname, "views"));

// view engine => 우리가 사용할 템플릿 엔진
app.set("view engine", "pug");


// bodyParser - middleware ( logger - morgan )
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(request, response) {
  var search = request.query.search;

  // Watcha API
  https.get("https://watcha.net/home/news.json?page=1&per=50", function(apiResponse) {
    var apiData = "";
    apiResponse.on("data", function(chunk) {
      apiData += chunk;
    });

    apiResponse.on("end", function() {
      var apiJsonData = JSON.parse(apiData);
      var news = apiJsonData.news; // List

      var matchedNews = [];
      if (search) {
        // for 문을 돌리면서, 만약 title 에 search 키워드가 포함되어 있으면,
        // matchedNews 에다가 추가
        news.forEach(function(newsInformation) {
          if (newsInformation.title.indexOf(search) > -1) {
            matchedNews.push(newsInformation);
          }
        });
      }
      else {
        matchedNews = news;
      }

      // 중간에 news 를 for 문 돌면서
      // title 에 키워드("곡성")이 포함이 되어 있으면,
      // 새로운 리스트로 push 해서 추가해준다.

      return response.render(
        "home",
        {news: matchedNews, search: search}  // news: apiJsonData.news
      );
    });
  });
});


// c9.io => 3000 => process.env.PORT
app.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
