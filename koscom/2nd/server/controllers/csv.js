module.exports = function(req, res) {
  var filename = req.url.replace("/csv/", "").replace("/", "") + ".csv";
  // URL Parameter Parsing

  res.write(filename);
  res.end();
}
