var http = require('http');


var requestOptions = {
  hostname: "api.zigbang.com",
  path: "/v1/items?detail=true&item_ids=3440906",
  method: "GET"
};


var request = http.request(
  requestOptions,
  function(response) {
    var data = "";

    response.on("data", function(chunk) {
      data += chunk;
    });

    response.on("end", function() {
      console.log(data);
    });
  }
);


request.on("error", function(error) {
  console.log(error);
});


request.end();
