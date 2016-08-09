var path = require("path");
var express = require("express");
var morgan = require("morgan");

var homeRouter = require("./routes/home");
var zigbangRouter = require("./routes/zigbang");
var watchaRouter = require("./routes/watcha");
var methodsRouter = require("./routes/methods");


var app = express();


// Application Settings
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// 3rd Party Middlewares
app.use( morgan("combined") );


app.use(function(req, res, next) {
  // HTTP POST Method
  var data = "";

  req.on("data", function(chunk) {
    data += chunk;
  });

  req.on("end", function() {
    var postData = {};

    data.split("&").forEach(function(keyValue) {
      var key = keyValue.split("=")[0];
      var value = keyValue.split("=")[1];

      postData[key] = value;
    });
    // return res.json(postData);
    // hello=world&key=value&nodejs=express

    req.myPostData = postData;
    next();  // return `function(req, res, next)`
  });
});


// Routers
app.use("/", homeRouter);
app.use("/zigbang/", zigbangRouter);
app.use("/watcha/", watchaRouter);
app.use("/methods/", methodsRouter);


app.listen(3000, function() {
  console.log("Server is listening");
});
