var request = require("request");


var options = {
  url: "https://www.yogiyo.co.kr/api/v1/restaurants-geo/?items=20&lat=37.5174887&lng=127.0184417&order=rank&page=0&search=&zip_code=137030",
  headers: {
    "X-ApiKey": "iphoneap",
    "X-ApiSecret": "fe5183cc3dea12bd0ce299cf110a75a2"
  }
};


request(options, function(error, response, body) {
  var data = JSON.parse(body);
  console.log(data);
});
