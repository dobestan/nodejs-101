var fs = require("fs");
var path = require("path");


function render(templateName, values, response) {
  var mainContent = fs.readFileSync(
    path.join(__dirname, "templates", templateName + ".html"),
    {encoding: "utf8"}
  );

  response.write(mainContent);
  response.end();
}


module.exports = render;
