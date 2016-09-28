var express = require("express");
var router = express.Router();


router.get("/signup/", function(req, res, next) {
    return res.render("auth/signup"); 
});


router.post("/signup", function(req, res, next) {
    // signup process
    // flash message
    return res.redirect("/"); 
});


router.get("/login/", function(req, res, next) {
    return res.render("auth/login"); 
});


router.post("/login/", function(req, res, next) {
    // login process
    // flash message
    return res.redirect("/"); 
});


module.exports = router;