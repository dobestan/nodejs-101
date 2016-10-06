var path = require("path");
var fs = require("fs");


module.exports = function(templateName, context, baseTemplateName) {
  var context = context || {};

  var baseTemplateName = baseTemplateName || "base";
  var baseTemplateFilePath = path.join(__dirname, "templates", baseTemplateName + ".html");
  var baseContent = fs.readFileSync(baseTemplateFilePath, "utf8");

  var templateFilePath = path.join(__dirname, "templates", templateName + ".html");
  var content = fs.readFileSync(templateFilePath, "utf8");

  content = baseContent.replace(
    "{{ content }}",
    content   // template 별로 존재하는 HTML 파일
  );

  for (var key in context) {
    var value = context[key];

    content = content.replace(
      "{{ " + key + " }}",
      value
    );
  }

  return content;
}
