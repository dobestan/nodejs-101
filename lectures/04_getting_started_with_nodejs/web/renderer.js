var fs = require("fs");
var path = require("path");


function render(templateName, values, response) {
  var baseContent = fs.readFileSync(
    path.join(__dirname, "templates", "base.html"),
    {encoding: "utf8"}
  );
  var headerContent = fs.readFileSync(
    path.join(__dirname, "templates", "partials", "header.html"),
    {encoding: "utf8"}
  );
  var footerContent = fs.readFileSync(
    path.join(__dirname, "templates", "partials", "footer.html"),
    {encoding: "utf8"}
  );
  var mainContent = fs.readFileSync(
    path.join(__dirname, "templates", templateName + ".html"),
    {encoding: "utf8"}
  );

  var content = baseContent
    .replace("{{ header }}", headerContent)
    .replace("{{ footer }}", footerContent)
    .replace("{{ content }}", mainContent);

  for (key in values) {
    var value = values[key];
    content = content.replace("{{ " + key + " }}", value);
  }

  response.write(content);
  response.end();
}


module.exports = render;
