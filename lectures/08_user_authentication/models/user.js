var mongoose = require("mongoose");


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


var User = mongoose.model("User", userSchema);


module.exports = User;
