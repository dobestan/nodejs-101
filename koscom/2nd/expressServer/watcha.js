var request = require("request");


module.exports = function (page, per, callback) {
  var url = "https://watcha.net/home/news.json?page=1&per=5";

  request(url, function(error, response, body) {
    if (error) return callback(error, null);
    var data = JSON.parse(body);
    return callback(null, data);
  });

  return undefined;
}


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