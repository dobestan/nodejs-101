var path = require("path");
var fs = require("fs");


module.exports = function(req, res) {
  var templateFilePath = path.join(__dirname, "..", "templates", "home.html");
  var content = fs.readFileSync(templateFilePath, "utf8");

  res.write(content);
  res.end();
}
