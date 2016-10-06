var express = require("express");
var router = express.Router();

var zigbangListRouter = require("./list");
var zigbangDetailRouter = require("./detail");


router.use("/", zigbangListRouter); // /zigbang/
router.use("/", zigbangDetailRouter);  // /zigbang/1234/


module.exports = router;
