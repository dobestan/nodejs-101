var express = require("express");
var router = express.Router();


router.get("/", function(req, res, next) {
    // 1. req.flash(key, value);   key => value ( setter )
    // 2. req.flash(key)       ;   key => value ( getter )
    
    // req.flash();          // connect-flash
    // req.flash("success", "Signup Successfully");
    // req.flash("error", "Password is too short");
    return res.json(req.flash());   
});


router.post("/", function(req, res, next) {
    // req.body
    req.flash("message", req.body.message);
    return res.send("Flash Message Added.");
    // + body-parser middleware
});


module.exports = router;