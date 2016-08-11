var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");


var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,  // raw text
  // "password" ======> (hash) ======> "1489382389fjdskfjsklajfklsdjafa"
  // "passwo" ======> (hash) ======> "14....

  // timestamp
  created_at: Date,
  updated_at: Date
});


userSchema.pre("save", function(next) {
  // timestamp
  var user = this;

  user.created_at = user.created_at || new Date();
  user.updated_at = new Date();

  next();
});


userSchema.pre("save", function(next) {
  // password hash
  var user = this;

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);

  console.log(user.password + " ===> " + hash);

  user.password = hash;

  next();

  // bcrypt.hash(user.password, 10, function(error, hash) {
  //   console.log(user.password + " ===> " + hash);
  //
  //   user.password = hash;
  //   next();
  // });
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
