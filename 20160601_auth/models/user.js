var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/nodecamp");


var userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

var User = mongoose.model("User", userSchema);


module.exports = User;
