// crawl koscom boards
// https://www.koscom.co.kr/portal/bbs/B0000008/list.do?menuNo=200321

var request = require("request");
var cheerio = require("cheerio");


var getKoscomPage = function(pageId) {
  return new Promise(function(resolve, reject) {
    var url = "https://www.koscom.co.kr/portal/bbs/B0000008/list.do?menuNo=200321&pageIndex=" + pageId;

    request.get({url: url, rejectUnauthorized: false}, function(error, response, body) {
      if (error) reject(error);

      var $ = cheerio.load(body);

      var postElements = $("table.table.table-bordered.table-hover.table-striped tbody tr");
      var results = [];
      postElements.each(function(postElement) {
        var postTitle = $(this).find("td.tit span.del").text();
        results.push(postTitle);
      });

      resolve(results);
    });
  });
}


var promises = [];
for (var i=1; i<8; i++) {
  promises.push(getKoscomPage(i));
}


Promise.all(promises)
  .then( function(values) {
    return values.filter(function(value) { return value.length })
  })
  .then( function(values) {
    values.map(function(titles) {
      titles.map(function(title) {
        console.log(title);
      })
    });
  } )