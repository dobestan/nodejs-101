var express = require('express');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/http', function(request, response) {
  response.json(request.query);
});


app.post('/http', function(request, response) {
  response.json(request.body);
});


app.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
