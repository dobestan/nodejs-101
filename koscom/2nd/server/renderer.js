var path = require("path");
var fs = require("fs");


module.exports = function(templateName, baseTemplateName) {
  var baseTemplateName = baseTemplateName || "base";
  var baseTemplateFilePath = path.join(__dirname, "templates", baseTemplateName + ".html");
  var baseContent = fs.readFileSync(baseTemplateFilePath, "utf8");

  var templateFilePath = path.join(__dirname, "templates", templateName + ".html");
  var content = fs.readFileSync(templateFilePath, "utf8");

  content = baseContent.replace(
    "{{ content }}",
    content   // template 별로 존재하는 HTML 파일
  );

  return content;
}
