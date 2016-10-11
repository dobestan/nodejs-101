// 1. Schema 를 생성 ( 큰 틀 )
// 2. Schema 를 바탕으로 모델을 생성
//    ( ODM; Object )

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


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
  user.password = user.password + "hashed!!";
  // user.createdAt = user.createdAt || new Date();
  // user.updatedAt = new Date();
  next();
});


// userSchema.post("save", function(user) {
//   require("../utils/sms")("01022205736", "01022205736", "[회원가입]", function(error, data) {
//     console.log(data);
//   });
// });


var User = mongoose.model("User", userSchema);
// 우리가 가지고 있는 User Model
// 데이터베이스 입장에서의 Collection => "users"


module.exports = User;
