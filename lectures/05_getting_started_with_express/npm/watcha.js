var request = require("request");


request("https://watcha.net/home/news.json?page=1&per=5", function(error, response, body) {
  var data = JSON.parse(body);
  console.log(data);
});
