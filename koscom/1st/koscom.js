// crawl koscom boards
// https://www.koscom.co.kr/portal/bbs/B0000008/list.do?menuNo=200321

var request = require("request");
var cheerio = require("cheerio");


var url = "https://www.koscom.co.kr/portal/bbs/B0000008/list.do?menuNo=200321"

request.get({url: url, rejectUnauthorized: false}, function(error, response, body) {
  if (error) throw error;

  var $ = cheerio.load(body);

  var postElements = $("table.table.table-bordered.table-hover.table-striped tbody tr");
  postElements.each(function() {
    var postTitle = $(this).find("td.tit span.del").text();
    var postUrl = $(this).find("td.tit a").attr("href");

    console.log(postTitle);
  });
});