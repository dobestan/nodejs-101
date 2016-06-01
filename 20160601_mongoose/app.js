var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");


var app = express();

var User = require("./models/user");

var postsRouter = require("./routes/posts");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// Serving Static Files
app.use('/static', express.static(__dirname + '/public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use("/posts", postsRouter);


app.get("/", function(request, response) {
  response.render("home");
});


app.get("/users", function(request, response) {
  User.find({}, function(error, users) {
    return response.render(
      "users/list",
      {"users": users}
    );
  });
});


app.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
