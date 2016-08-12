var request = require("request");

function getZigbang(roomId) {
  return new Promise(function(resolve, reject) {
    var apiUrl = "https://api.zigbang.com/v1/items?detail=true&item_ids=" + roomId;
    request.get(apiUrl, function(error, response, body) {
      if (error) reject(error);
      resolve(body);
    });
  });
}

var promiseList = [];
for (var i=3440906; i<3441006; i++) {
  promiseList.push(getZigbang(i));
}

// Promise.all(promiseList)
//   .then(function(values) { return values.map(JSON.parse) })
//   .then(function(values) { return values.filter(function(value) {
//     return value.count_agent === 1
//   }) })
//   .then(function(values) { return values.map(function(value) {
//     return {
//       id: value.items[0].item.id,
//       deposit: value.items[0].item.deposit,
//       rent: value.items[0].item.rent,
//     }
//   })})



var request = require("request");
var cheerio = require("cheerio");



function getKoscom(pageId) {
  var url = "https://www.koscom.co.kr/portal/bbs/B0000008/list.do?menuNo=200321&pageIndex=" + pageId;
  return new Promise(function(resolve, reject) {
    request.get({url: url, rejectUnauthorized: false}, function(error, response, body) {
      if (error) reject(error);

      var $ = cheerio.load(body);  // body parsing
      // CSS Selector
      var result = [];
      var postElements = $("table.table-bordered.table-hover.table-striped tbody tr");
      postElements.each(function(postElement) {
        var postTitle = $(this).find("td.tit span.del").text();
        result.push(postTitle);
      })

      resolve(result);
    });
  });
}


Promise.all([getKoscom(1), getKoscom(2), getKoscom(3), getKoscom(4)])
  .then(console.log)
