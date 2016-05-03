function home(request, response) {
  if (request.url === "/") {
    response.write("home");
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
