var request = require("request");


// callback == function(error, data) {...}
module.exports = function(roomId, callback) {
  var url = "https://api.zigbang.com/v1/items?detail=true&item_ids=" + roomId;

  request(url, function(error, response, body) {
    if (error) { return callback(error, null )};
    var data = JSON.parse(body);
    var items = data.items;  // Array => Array.length => 0, 1

    // 매물 정보가 없는 경우에 처리
    if (items.length === 0) {
      var err = new Error("매물 정보가 없습니다.");
      return callback(err, null);
    }

    data = {
      deposit: items[0].item.deposit,
      rent: items[0].item.rent,
      address: items[0].item.agent_address1,
      image: items[0].item.profile_url,
    };

    callback(null, data);
  });
}
