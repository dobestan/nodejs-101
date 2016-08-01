var express = require("express");
var router = express.Router();

var Contact = require("../models/contact");


router.get("/", function(request, response) {
  Contact.find({}, function(error, contacts) {
    return response.render("contacts", {contactItems: contacts});
  });
});


router.post("/", function(request, response) {
  var name = request.body.name;
  var email = request.body.email;
  var phonenumber = request.body.phonenumber;

  var contact = new Contact({
    name: name,
    email: email,
    phonenumber: phonenumber
  });
  contact.save(function(error) {
    if (error) throw error;

    return response.redirect("/contacts/");
  });
});


module.exports = router;
