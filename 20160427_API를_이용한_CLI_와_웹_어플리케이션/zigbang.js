var http = require('http');


function get(roomId) {
  var request = http.get("http://api.zigbang.com/v1/items?detail=true&item_ids=" + roomId, function(response){
    var data = "";

    response.on("data", function(chunk) {
      data += chunk;  // data = data + chunk
    });

    response.on("end", function(chunk) {

      try {
        var jsonData = JSON.parse(data);
        var roomInformation = jsonData.items[0].item;

        console.log(roomInformation.agent_address1);
        console.log(roomInformation.deposit);
        console.log(roomInformation.rent);
      } catch (error) {
        console.log(error.message);
      }
    });
  });
}


var roomIds = process.argv.slice(2);
roomIds.forEach(get);
