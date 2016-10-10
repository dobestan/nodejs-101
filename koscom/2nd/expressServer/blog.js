
var request = require("request");
var cheerio = require("cheerio");  // DOM(Document Object Model) == jQuery

var url = "https://dobest.io/";

request(url, function(error, response, body) {
  if (error) throw error;

  var $ = cheerio.load(body);
  var postElements = $("article.post");

  postElements.each(function(postElement) {
    var title = $(this).find("h1").text();
    console.log(title);
  });
});
