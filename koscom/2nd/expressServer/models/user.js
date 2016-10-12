// 1. Schema 를 생성 ( 큰 틀 )
// 2. Schema 를 바탕으로 모델을 생성
//    ( ODM; Object )

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bcrypt = require("bcryptjs");


var userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  updatedAt: Date,
  createdAt: Date
});


// Signal ( Hooks )
userSchema.pre("save", function(next) {
  var user = this;
  user.createdAt = user.createdAt || new Date();
  user.updatedAt = new Date();
  next();
});


userSchema.pre("save", function(next) {
  var user = this;

  var salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);

  next();
});


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

userSchema.statics.authenticate = function (username, password, callback) {  // function (error, user)
  User.findOne({username: username}, function(error, user) {
    if (error) { return callback(error) };
    if (!user) {
      var error = new Error("유저 정보가 없습니다.");
      return callback(error);
    }
    if (bcrypt.compareSync(password, user.password)) {
      return callback(error, user);
    } else {
      var error = new Error("유저 정보가 없습니다.");
      return callback(error);
    }
  });
}


// userSchema.post("save", function(user) {
//   require("../utils/sms")("01022205736", "01022205736", "[회원가입]", function(error, data) {
//     console.log(data);
//   });
// });


var User = mongoose.model("User", userSchema);
// 우리가 가지고 있는 User Model
// 데이터베이스 입장에서의 Collection => "users"


module.exports = User;
