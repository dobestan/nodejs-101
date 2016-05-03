var express = require("express");
var logger = require("morgan");

var router = require('./router');


var app = express();

app.use(logger());
app.use('/', router);


app.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
