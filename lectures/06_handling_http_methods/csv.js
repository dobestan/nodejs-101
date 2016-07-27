var fs = require('fs');


module.exports = function(filePath) {
  data = fs.readFileSync(
    filePath,
    {encoding: "utf8"}
  );

  var rows = data.split("\n");
  var headers = rows[0].split(",");

  var rowsData = [];

  rows.slice(1).forEach(function(row) {
    var rowData = {}

    for (var headerIndex=0; headerIndex < headers.length; headerIndex++ ) {
      var header = headers[headerIndex];
      rowData[header] = row.split(",")[headerIndex];
    }

    rowsData.push(rowData);
  });

  return rowsData;
}
