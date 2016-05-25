var express = require('express');
var bodyParser = require('body-parser');

var httpRouter = require('./routes/http');
var usersRouter = require('./routes/users');
var usersApiRouter = require('./routes/api/users.js');

var monk = require('monk');
var db = monk('mongodb://localhost:27017/nodecamp');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(function(request, response, next) {
  request.db = db;
  next();
});


app.use('/http', httpRouter);
app.use('/users', usersRouter);
app.use('/api/users', usersApiRouter);


app.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
