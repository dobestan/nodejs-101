var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/nodecamp");


var userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

var User = mongoose.model("User", userSchema);


userSchema.plugin(passportLocalMongoose);


module.exports = User;
