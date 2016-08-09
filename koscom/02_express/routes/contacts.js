var express = require("express");
var router = express.Router();


var contact = require("../models/contact");


// contacts:list
router.get("/", function(req, res, next) {
  return res.render("contacts/list", {});
});


// contacts:create
router.post("/", function(req, res, next) {
  console.log(req.body);
  return res.redirect("/contacts/");
});


module.exports = router;
