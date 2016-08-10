var express = require("express");
var router = express.Router();


var contact = require("../models/contact");


// contacts:list
router.get("/", function(req, res, next) {
  contact.read(function(error, contacts) {
    return res.render("contacts/list", {contacts: contacts});
  });
});


// contacts:create
router.post("/", function(req, res, next) {
  // "안수찬,dobestan@gmail.com,01022205736\n"
  var data = req.body.name + "," + req.body.email + "," + req.body.phonenumber + "\n";

  contact.add(data, function(error) {
    return res.redirect("/contacts/");
  });
});


module.exports = router;
