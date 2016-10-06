var renderer = require("../renderer");


module.exports = function(req, res) {
  var content = renderer("about");

  res.write(content);
  res.end();
}
