var express = require("express");
var router = express.Router();


var contact = require("../models/contact");


// contacts:list
router.get("/", function(req, res, next) {
  // var contacts = contact.read();

  // var data = contact.read()
  // contact.read(  function(error, contacts) {...}  );
  contact.read(function(error, contacts) {
    return res.render("contacts/list", {contacts: contacts});
  });
});


// contacts:create
router.post("/", function(req, res, next) {
  console.log(req.body);
  return res.redirect("/contacts/");
});


module.exports = router;
