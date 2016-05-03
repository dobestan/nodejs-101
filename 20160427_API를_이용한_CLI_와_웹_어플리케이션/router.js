var fs = require('fs');


function home(request, response) {
  if (request.url === "/") {
    var baseContent = fs.readFileSync("./templates/base.html", "utf8");
    var headerContent = fs.readFileSync("./templates/header.html", "utf8");
    var footerContent = fs.readFileSync("./templates/footer.html", "utf8");
    var mainContent = fs.readFileSync("./templates/home.html", "utf8");

    mergedContent = baseContent.replace("{{ header }}", headerContent);
    mergedContent = mergedContent.replace("{{ footer }}", footerContent);
    mergedContent = mergedContent.replace("{{ content }}", mainContent);

    response.write(mergedContent);
    response.end();
  }
}


function room(request, response) {
  var roomId = request.url.replace("/", "");
  if (roomId.length > 0) {
    response.write(roomId);
    response.end();
  }
}


module.exports.home = home;
module.exports.room = room;
