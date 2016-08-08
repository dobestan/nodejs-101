var fs = require("fs");


function readCsv(filename) {
  var data = fs.readFileSync(filename, "utf8");

  var rows = data.split("\n");
  var headers = rows[0].split(",");

  var result = [];
  rows.slice(1).forEach(function(row) {
    var data = {};
    var rowData = row.split(",");

    for (var headerIndex=0; headerIndex < headers.length; headerIndex++) {
      var header = headers[headerIndex];
      data[header] = rowData[headerIndex];
    }

    result.push(data);
  });

  return result;
}


module.exports.readCsv = readCsv;
