// https://github.com/dobestan/nodejs-101/tree/master/koscom/2nd/express
//
//
// $ npm init    // package.json 초기화
// $ npm install --save express    // express 설치 + 동시에 pakcage.json 에 기록


var express = require("express");   // http.createServer

var app = express();

// npm install -g nodemon
// nodemon app.js ( nodemon 켜져있는 곳에서 "rs + Enter" )


var logger = function(req, res, next) {
  console.log("Request on", req.url, "at", new Date());
  next();
}
app.use(logger);


app.get("/", function(req, res, next) {
  return res.send("home");
});


app.get("/about", function(req, res, next) {
  return res.send("about");
});


app.listen(3000, function() {
  console.log("Server is running");
});
