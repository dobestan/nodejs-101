var express = require('express');
var bodyParser = require('body-parser');

var httpRouter = require('./routes/http');
var usersRouter = require('./routes/users.js');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/http', httpRouter);
app.use('/users', usersRouter);


app.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
