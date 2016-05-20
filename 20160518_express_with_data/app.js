var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");

var users = require('./routes/users');
var usersApi = require('./routes/api/users');


var app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/users", usersApi);
app.use("/users", users);


app.listen(3000, function() {
  console.log("Server is listening on 3000");
});
