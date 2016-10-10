var request = require("request");


module.exports = function (page, per, callback) {
  var url = "https://watcha.net/home/news.json?page=" + page + "&per=" + per;

  request(url, function(error, response, body) {
    if (error) return callback(error, null);
    var data = JSON.parse(body);
    return callback(null, data);
  });
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