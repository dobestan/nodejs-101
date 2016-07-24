var https = require("https");


var options = {
  hostname: "www.yogiyo.co.kr",
  path: "/api/v1/restaurants-geo/?items=20&lat=37.5174887&lng=127.0184417&order=rank&page=0&search=&zip_code=137030",
  headers: {
    "X-ApiKey": "iphoneap",
    "X-ApiSecret": "fe5183cc3dea12bd0ce299cf110a75a2"
  }
};


var request = https.request(
  options,
  function(response) {
    var data = "";

    response.on("data", function(chunk) {
      data += chunk;
    });

    response.on("end", function() {
      console.log(JSON.parse(data));
    });
  }
);


request.on("error", function(error) {
  console.log(error);
});


request.end();
