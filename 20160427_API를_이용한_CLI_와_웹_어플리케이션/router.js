var render = require('./renderer');


function home(request, response) {
  if (request.url === "/") {
    render("home", {}, response);
  }
}


function room(request, response) {
  var roomId = request.url.replace("/", "");
  if (roomId.length > 0) {
    render("room", {}, response);
  }
}


module.exports.home = home;
module.exports.room = room;
