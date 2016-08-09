var express = require("express");
var router = express.Router();


// POSTMAN ( getpostman.com )

router.get("/", function(req, res, next) {
  // GET - request.query
  return res.json(req.query);
  // {hello: "world"}
});



// http.get()
router.post("/", function(req, res, next) {
  return res.json(req.myPostData);
});


module.exports = router;
