var express = require("express");
var router = express.Router();

var moviesRouter = require("./movies");
var roomsRouter = require("./rooms");


router.use("/movies", moviesRouter);
router.use("/rooms", roomsRouter);


module.exports = router;
