var https = require('https');
var fs = require('fs');


function home(request, response) {
  if (request.url === "/") {
    var apiRequest = https.get("https://watcha.net/home/news.json?page=1&per=20", function(apiResponse) {
      var apiData = "";

      apiResponse.on("data", function(chunk) {
        apiData += chunk;
      });

      apiResponse.on("end", function() {
        var apiJsonData = JSON.parse(apiData);

        var baseContent = fs.readFileSync("./templates/base.html", "utf8");
        var headerContent = fs.readFileSync("./templates/header.html", "utf8");
        var footerContent = fs.readFileSync("./templates/footer.html", "utf8");

        baseContent = baseContent.replace("{{ header }}", headerContent);
        baseContent = baseContent.replace("{{ footer }}", footerContent);

        var news = apiJsonData.news;
        newsContent = "";

        for (newsId in news){
          newsContent += "<img src='{{ image_url }}'>".replace("{{ image_url }}", news[newsId].image);
        }

        baseContent = baseContent.replace("{{ content }}", newsContent);

        response.write(baseContent);
        response.end();
      });
    });
  }
}


module.exports.home = home;
