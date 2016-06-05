var express = require('express');
var mongoose = require('mongoose');


var app = express();


mongoose.connect("mongodb://localhost/passport");


app.listen(3000, function(request, response) {
  console.log("Server is listening on localhost:3000");
});
