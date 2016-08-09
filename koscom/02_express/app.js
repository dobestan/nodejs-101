var path = require("path");
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");

var homeRouter = require("./routes/home");
var zigbangRouter = require("./routes/zigbang");
var watchaRouter = require("./routes/watcha");
var methodsRouter = require("./routes/methods");
var contactsRouter = require("./routes/contacts");

var methodMiddleware = require("./middlewares/method");


var app = express();


// Application Settings
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// 3rd Party Middlewares
app.use( morgan("combined") );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: true}) );

// app.use( methodMiddleware.getPostDataMiddleware() );


// Routers
app.use("/", homeRouter);
app.use("/zigbang/", zigbangRouter);
app.use("/watcha/", watchaRouter);
app.use("/methods/", methodsRouter);
app.use("/contacts/", contactsRouter);


app.listen(3000, function() {
  console.log("Server is listening");
});
