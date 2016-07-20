var fs = require("fs");
var path = require("path");


function render(templateName, values, response) {
  var mainContent = fs.readFileSync(
    path.join(__dirname, "templates", templateName + ".html"),
    {encoding: "utf8"}
  );

  for (key in values) {
    var value = values[key];
    mainContent = mainContent.replace("{{ " + key + " }}", value);
  }

  response.write(mainContent);
  response.end();
}


module.exports = render;
