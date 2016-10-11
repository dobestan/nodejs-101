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

var User = mongoose.model("User", userSchema);
// 우리가 가지고 있는 User Model
// 데이터베이스 입장에서의 Collection => "users"


module.exports = User;
