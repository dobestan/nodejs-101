var path = require("path");

var express = require("express");


var app = express();


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


app.get("/", function(request, response) {
  return response.render(
    "home",
    {
      title: "Node.js 로 시작하는 웹 프로그래밍"
    }
  );
});


app.listen(3000, function() {
  console.log("Server is running");
});
