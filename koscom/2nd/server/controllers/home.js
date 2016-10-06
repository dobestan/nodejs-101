var renderer = require("../renderer");


module.exports = function(req, res) {
  var content = renderer("home");

  res.write(content);
  res.end();
}
