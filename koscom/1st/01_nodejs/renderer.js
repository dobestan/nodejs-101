var path = require("path");
var fs = require("fs");


module.exports = function (request, response, templateName, context) {
  var baseTemplatePath = path.join(__dirname, "templates", "base.html");
  var headerTemplatePath = path.join(__dirname, "templates", "partials", "header.html");
  var footerTemplatePath = path.join(__dirname, "templates", "partials", "footer.html");

  var templatePath = path.join(__dirname, "templates", templateName + ".html");

  var baseContent = fs.readFileSync(baseTemplatePath, "utf8");
  var headerContent = fs.readFileSync(headerTemplatePath, "utf8");
  var footerContent = fs.readFileSync(footerTemplatePath, "utf8");

  var mainContent = fs.readFileSync(templatePath, "utf8");

  mainContent = baseContent.replace("{{ content }}", mainContent);
  mainContent = mainContent.replace("{{ header }}", headerContent);
  mainContent = mainContent.replace("{{ footer }}", footerContent);

  for (var key in context) {
    var value = context[key];
    mainContent = mainContent.replace("{{ " + key + " }}", value);
  }

  response.write(mainContent);
  response.end();
}
