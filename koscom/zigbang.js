var request = require("request");


var apiUrl = "https://api.zigbang.com/v1/items?detail=true&item_ids=";


var getZigbang = function(roomId) {
  return new Promise(function(resolve, reject) {
    request.get(apiUrl + roomId, function(error, response, body) {
      if (error) reject(error);
      resolve(JSON.parse(body));
    });
  });
}


var promises = [];
for ( var i=3440906; i < 3441006; i++ ) {
  promises.push(getZigbang(i));
}


Promise.all(promises)
  .then( function(values) {
    return values.map(function(data) {
      if (data.items[0]) {
        return data.items[0].item.id
      }
      return null
    })
  })
  .then( function(values) {
    return values.filter(function(value) { return value })
  } )
  .then(console.log);