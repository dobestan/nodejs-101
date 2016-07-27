var express = require("express");


var homeRouter = require("./routes/home");
var httpRouter = require("./routes/http");
var usersRouter = require("./routes/users");


var app = express();


// Middleware - Router
app.use("/", homeRouter);
app.use("/http/", httpRouter);
app.use("/users/", usersRouter);


app.listen(3000, function() {
  console.log("Server is running");
});
