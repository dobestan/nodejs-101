var path = require("path");
var fs = require("fs");


function readContact(callback) {
  var filepath = path.join(__dirname, "../data", "contacts.csv");
  // var data = fs.readFileSync(filepath, "utf8");

  fs.readFile(filepath, "utf8", function(error, data) {
    var rows = data.split("\n");

    var contacts = [];
    rows.slice(1).forEach(function(row) {
      var contact = {
        name: row.split(",")[0],
        email: row.split(",")[1],
        phonenumber: row.split(",")[2],
      }
      contacts.push(contact);
    });

    return callback(error, contacts);
  });
}


function addContact(contact) {
  //
}


module.exports.read = readContact;
module.exports.add = addContact;
