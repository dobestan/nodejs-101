var express = require("express");
var path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");

var app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(request, response) {
  response.send("home");
});


app.get("/users", function(request, response) {
  // User List
  var users = [];
  var data = fs.readFileSync("db.csv");
  var lines = String(data).split("\n");  // newline character

  for (var lineIndex in lines) {
    var line = lines[lineIndex];

    var userId = Number(lineIndex) + 1;
    var name = line.split(",")[0];
    var email = line.split(",")[1];

    var user = {
      userId: userId,
      name: name,
      email: email
    }

    if (name) {
      users.push(user);
    }
  }

  return response.render("users/list", {users: users});
});


app.get("/users/new", function(request, response) {
  return response.render("users/new");
});

app.post("/users/new", function(request, response) {
  // POST 의 값으로 전달된 Name, Email 정보를 받아서,
  // 유저를 추가한다.
  var name = request.body.name;
  var email = request.body.email;

  // 1. 데이터를 바탕으로, 기존 파일에 마지막 한 줄 추가하기
  var data = name + "," + email + "\n";
  fs.appendFile("db.csv", data);
  // 2. 적절한 페이지로 이동 ( redirect ) => user list
  //
  // var data = fs.readFileSync("db.csv");
  // var lines = String(data).split("\n");
  // var length = lines.length;  // 유저 명수 + 1
  return response.redirect("/users");

  // return response.redirect("/users/" + (length));
});


app.get("/users/:userId", function(request, response) {
  var userId = request.params.userId;

  var data = fs.readFileSync("db.csv");
  var lines = String(data).split("\n");  // newline character
  var line = lines[userId - 1];  // 특정 유저 정보만 찾는다.

  var name = line.split(",")[0];
  var email = line.split(",")[1];

  var user = {
      userId: userId,
      name: name,
      email: email
  }

  return response.render("users/detail", {user: user});
});


app.listen(3000, function() {
  console.log("Server is listening on 3000");
});
