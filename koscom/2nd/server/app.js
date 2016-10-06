var http = require("http");

var logMiddleware = require("./middlewares").logMiddleware;


var app = http.createServer(function(req, res) {
  logMiddleware(req, res);

  if (req.url == "/") {   // Router
    require("./controllers/home")(req, res);   // Controller
  }

  if (req.url == "/about/") {
    require("./controllers/about")(req, res);
  }

  if (req.url.indexOf("/csv/") == 0) {
    require("./controllers/csv")(req, res);
  }
});


app.listen(3000, function() {
  console.log("Server is running on localhost:3000");
});
