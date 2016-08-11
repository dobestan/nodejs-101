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


// User.authenticate
userSchema.statics.authenticate = function(username, password, callback) {
  User.findOne({username: username}, function(error, user) {
    if (error) return callback(error, null);
    if (!user) return callback(null, null);

    // password compare
    if ( user.password !== password ) {
      return callback(null, null);
    } else {
      return callback(null, user);
    }
  });
}


var User = mongoose.model("User", userSchema);


module.exports = User;
