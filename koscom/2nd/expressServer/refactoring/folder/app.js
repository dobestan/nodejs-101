var hello = require("./hello").hello;
var world = require("./hello").world;
//          == module.exports


var hello2 = require("./hello/hello").hello2;
var hello3 = require("./hello/hello").hello3;


hello();
world();
hello2();
hello3();
