var express = require("express");   // http.createServer

var homeRouter = require("./routes/home"); // router
var aboutRouter = require("./routes/about"); // router

var app = express();


var logger = function(req, res, next) {
  console.log("Request on", req.url, "at", new Date());
  next();
}
app.use(logger);


app.use("/", homeRouter);
app.use("/about", aboutRouter);


app.listen(3000, function() {
  console.log("Server is running");
});
