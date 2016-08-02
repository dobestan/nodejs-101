var mongoose = require("mongoose");
var bcrypt = require("bcrypt");


var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  phonenumber: String,

  // Time Stamp
  // timestamps: true 로 변경할 수 있습니다.
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});


userSchema.pre("save", function(next) {
  var user = this;

  bcrypt.hash(this.password, 10, function(error, hash) {
    if (error) return next(error);

    var newPassword = hash;
    user.password = newPassword;

    // TODO: should send sms to user
    console.log("Sending signup congrat SMS to " + user.phonenumber);

    return next();
  });
});


var User = mongoose.model("User", userSchema);


module.exports = User;
