var fs = require('fs');


function list() {
  var data = fs.readFileSync("db.csv", "utf8");

  var lines = String(data).split("\n");
  var usersInformation = [];

  lines.forEach(function(line) {
    var name = line.split(",")[0];
    var email = line.split(",")[1];

    if (name !== "" ) {
      var userInformation = {'name': name, 'email': email};
      usersInformation.push(userInformation);
    }
  });

  return {'users': usersInformation};
}


function create(name, email) {
  var data = name + "," + email + "\n";
  fs.appendFile("db.csv", data, function(err){
  });
}


function retrieve(userId) {
  var data = fs.readFileSync("db.csv", "utf8");

  var lines = String(data).split("\n");
  var userInformation = lines[userId-1];

  var name = userInformation.split(",")[0];
  var email = userInformation.split(",")[1];

  var data = {'name': name, 'email': email};
  return data;
}


module.exports.list = list;
module.exports.create = create;
module.exports.retrieve = retrieve;
