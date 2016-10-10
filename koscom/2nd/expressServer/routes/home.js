var express = require("express");
var router = express.Router();


router.get("/", function(req, res, next) {
  var context = {
    name: "Suchan An",
    animals: ["강아지", "고양이", "물고기", "새"]
  };
  return res.render("home", context);
});


module.exports = router;
