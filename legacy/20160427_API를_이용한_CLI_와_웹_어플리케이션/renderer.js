var fs = require('fs');


function render(templateName, values, response) {
  var baseContent = fs.readFileSync("./templates/base.html", "utf8");
  var headerContent = fs.readFileSync("./templates/header.html", "utf8");
  var footerContent = fs.readFileSync("./templates/footer.html", "utf8");
  var mainContent = fs.readFileSync("./templates/" + templateName + ".html", "utf8");

  mergedContent = baseContent.replace("{{ header }}", headerContent);
  mergedContent = mergedContent.replace("{{ footer }}", footerContent);
  mergedContent = mergedContent.replace("{{ content }}", mainContent);

  for (var key in values) {
    mergedContent = mergedContent.replace(
      "{{ " + key + " }}",
      values[key]
    );
  }

  response.write(mergedContent);
  response.end();
}


module.exports = render;
