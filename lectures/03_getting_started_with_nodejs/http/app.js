var http = require('http');
var fs = require('fs');
var path = require('path');


var app = http.createServer(function(request, response) {
  if (request.url === "/") {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>hello world</h1>");
    response.end();
  }

  if (request.url === "/json/") {
    response.writeHead(200, {"Content-Type": "application/json"});
    var data = {"Content-Type": "application/json"};
    response.write(JSON.stringify(data));
    response.end();
  }

  if (request.url === "/students/") {
    fs.readFile(path.join(__dirname, "../data/students.csv"), {encoding: "utf8"}, function(error, data) {
      if (error) { throw error; }
      var students = [];
      var rows = data.split("\n");

      for (var rowIndex=0; rowIndex<rows.length-1; rowIndex++) {
        var row = rows[rowIndex];
        var columns = row.split(",");

        if (rowIndex === 0) {
          var headers = columns;
          var headersCount = headers.length;
        } else {
          var student = {};
          for (var headerIndex=0; headerIndex<headersCount; headerIndex++) {
            student[headers[headerIndex]] = columns[headerIndex];
          }
          students.push(student);
        }
      }

      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(JSON.stringify(students));
      response.end();
    });
  }
}).listen(3000);
