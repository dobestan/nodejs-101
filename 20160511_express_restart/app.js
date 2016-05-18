var express = require("express");
var logger = require("morgan");
var path = require("path");


var app = express();

var router = require("./router");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug")

app.use(express.static(path.join(__dirname, 'public')));
app.use("/", router);

// app.use(function requestTimeLog(request, response, next) {
//   console.log("request " + request.url + " on " + Date.now());
//   next();
// });
//
//
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


app.use(logger())

app.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
