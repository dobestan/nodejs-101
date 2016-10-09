var request = require("request");
var cheerio = require("cheerio");


var Iconv = require('iconv').Iconv;
var iconv = new Iconv('euc-kr', 'utf-8//translit//ignore');


var stockCode = 192820;
var stockDetailPageUrl = "http://finance.naver.com/item/main.nhn?code=" + stockCode;


var requestOptions = {
  url: stockDetailPageUrl,
  encoding: null
};


request(requestOptions, function(error, response, body) {
  if (error) throw error;
  var body = iconv.convert(body).toString();

  var $ = cheerio.load(body);

  // 종목명 크롤링
  var stockName = $(".wrap_company h2").text();

  // 종목 상승/하락 크롤링
  var className = $(".no_today").find("em").attr("class");
  var isUp = className == "no_up" ? true : false;

  // 종목 상승률/하락률 크롤링
  var stockPrice = $("#chart_area .rate_info .no_exday em").eq(0).find(".blind").text();
  stockPrice = Number(stockPrice.replace(/,/gi, ""));

  var stockChangeRate = $("#chart_area .rate_info .no_exday em").eq(1).find(".blind").text();
  stockChangeRate = Number(stockChangeRate);

  console.log(stockName);
  console.log(isUp);
  console.log(stockPrice);
  console.log(stockChangeRate);
});
