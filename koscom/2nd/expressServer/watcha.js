// var http = require("https");
var request = require("request");


var url = "https://watcha.net/home/news.json?page=1&per=5";

request(url, function(error, response, body) {
  var data = JSON.parse(body);
  console.log(data);
});


// http.get(url, function(response) {
//   var data = "";
//
//   response.on("data", function(chunk) {
//     data += chunk;
//   });
//
//   response.on("end", function() {
//     data = JSON.parse(data);
//     console.log(data);
//   });
// });