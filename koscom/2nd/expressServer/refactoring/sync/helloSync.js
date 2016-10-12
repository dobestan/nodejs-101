var fs = require("fs");


module.exports = function(filePath) {
  var data = fs.readFileSync("./hello.txt", "utf8");
  var result = "start\n" + data + "end";
  return result;
}


// module.exports = function() {
//   return function(filePath) {
//     var data = fs.readFileSync("./hello.txt", "utf8");
//     var result = "start\n" + data + "end";
//     return result;
//   }
// }


