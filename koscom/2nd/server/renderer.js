var path = require("path");
var fs = require("fs");


module.exports = function(templateName) {
  var templateFilePath = path.join(__dirname, "templates", templateName + ".html");
  var content = fs.readFileSync(templateFilePath, "utf8");

  return content;
}
