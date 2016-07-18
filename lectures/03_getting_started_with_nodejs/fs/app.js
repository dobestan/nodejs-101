var fs = require('fs');
var path = require('path');


// Asynchronous
fs.readFile(path.join(__dirname, "../data/simple.txt"), {encoding: "utf8"}, function(error, data) {
  if (error) { throw error; }
  console.log(data);
});


// Synchronous
var data = fs.readFileSync(path.join(__dirname, "../data/simple.txt"), {encoding: "utf8"});
console.log(data);


// Asynchronous
fs.readFile(path.join(__dirname, "../data/students.csv"), {encoding: "utf8"}, function(error, data) {
  if (error) { throw error; }
  var rows = data.split("\n");

  var students = [];

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

  console.log(students);
});
