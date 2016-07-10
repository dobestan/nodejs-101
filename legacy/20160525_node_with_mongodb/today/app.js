var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

var monk = require('monk');
var db = monk('mongodb://localhost:27017/nodecamp');
// db ... db
// table ... collection ( posts, users )
// row ... document ( json )


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(function(request, response, next) {
  request.db = db;  // 다른 Router 에서 request 객체를 통해서 db에 접근할 수 있게 한다.
  next();
});


app.use("/", homeRouter);
app.use("/users/", usersRouter);
app.use("/posts/", postsRouter);


app.listen(3000, function() {  // c9.io => process.env.PORT
  console.log("Server is listening on localhost:3000");
});
