var mongoose = require("mongoose");


var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,

  // timestamp
  created_at: Date,
  updated_at: Date
});


userSchema.pre("save", function(next) {
  var user = this;

  user.created_at = user.created_at || new Date();
  user.updated_at = new Date();

  next();
});


var User = mongoose.model("User", userSchema);


module.exports = User;
