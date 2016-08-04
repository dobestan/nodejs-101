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


userSchema.statics.authenticate = function() {
  return function(username, password, callback) {
    User.findOne({username: username})
      .exec(function(error, user) {
        if (error) return callback(error);
        if (!user) {
          var erorr = new Error("User not found.");
          error.status = 401;
          return callback(error);
        }

        bcrypt.compare(password, user.password, function(error, result) {
          if (error) return callback(error);

          if (result) {
            return callback(null, user);
          } else {
            var error = new Error("username, password does not match.");
            error.status = 401;
            return callback(error);
          }
        });
      });
  }
}


userSchema.statics.serialize = function() {
  return function(user, callback) {
    return callback(null, user._id);
  }
}


userSchema.statics.deserialize = function() {
  return function(id, callback) {
    User.findOne({_id: id}, function(error, user) {
      return callback(error, user);
    });
  }
}


var User = mongoose.model("User", userSchema);


module.exports = User;
