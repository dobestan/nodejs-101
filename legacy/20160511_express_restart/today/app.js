// Express
var path = require("path");
var express = require("express");
var logger = require("morgan");

var router = require("./router");


var app = express();


app.set("views", path.join(__dirname, "views")); // 실행중인 파일의 디렉토리에 있는 views 폴더
app.set("view engine", "pug");


app.use(logger());

app.use("/", router);


app.listen(3000, function(){
  console.log("Server is listening on localhost:3000");
});
