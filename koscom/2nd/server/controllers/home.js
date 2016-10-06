var path = require("path");
var fs = require("fs");


module.exports = function(req, res) {
  var templateFilePath = path.join(__dirname, "..", "templates", "home.html");

  res.write(templateFilePath);
  res.end();
}
