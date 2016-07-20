function homeRouter(request, response) {
  if (request.url === "/") {
    response.write("<h1>Home</h1>");
    response.end();
  }
}


function roomRouter(request, response) {
  var roomId = request.url.replace("/", "");
  if (roomId.length > 0) {
    response.write(roomId);
    response.end();
  }
}


module.exports.home = homeRouter;
module.exports.room = roomRouter;
