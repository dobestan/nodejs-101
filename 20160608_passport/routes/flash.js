var express = require('express');
var router = express.Router();


router.get("/", function(request, response) {
  request.flash("test", "nodecamp is awesome");
  return response.redirect("/flash/result");
});


router.get("/result", function(request, response) {
  return response.send(JSON.stringify(request.flash("test")));
});


module.exports = router;
