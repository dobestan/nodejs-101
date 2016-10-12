var fs = require("fs");


module.exports = function(filePath, callback) {
  fs.readFile(filePath, "utf8", function(error, data) {
    var result = "start\n" + data + "end";
    return callback(error, result);
  });
  // return undefined;
}
