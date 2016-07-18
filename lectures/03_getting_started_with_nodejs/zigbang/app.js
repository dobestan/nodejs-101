var http = require('http');


function zigbang(zigbangItemId) {
  var zigbangApiBaseUrl = "http://api.zigbang.com/v1/items?detail=true&item_ids=";
  var zigbangApiUrl = zigbangApiBaseUrl + zigbangItemId;


  http.get(zigbangApiUrl, function(response) {
    var data = "";

    response.on("data", function(chunk) {
      data += chunk;
    });

    response.on("end", function() {
      try {
        var zigbangData = JSON.parse(data);
        var zigbangItem = zigbangData["items"][0]["item"];

        var address = zigbangItem["agent_address1"];
        var deposit = zigbangItem["deposit"];
        var rent = zigbangItem["rent"];

        var result = {
          address: address,
          deposit: deposit,
          rent: rent
        };
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    });
  });
}


var zigbangItemIds = process.argv.slice(2);
zigbangItemIds.forEach(function (zigbangItemId) {
  zigbang(zigbangItemId);
});
