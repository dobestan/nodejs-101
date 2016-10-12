// 1. Schema 를 생성 ( 큰 틀 )
// 2. Schema 를 바탕으로 모델을 생성
//    ( ODM; Object )

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var postSchema = new Schema({
  title: String,
  content: String,
  createdAt: Date,
  updatedAt: Date
});


// Pre-save Signal, Hook
postSchema.pre("save", function(next) {
  var currentDate = new Date();
  var post = this;

  post.createdAt = post.createdAt || currentDate;
  post.updatedAt = currentDate;

  next();
});


var Post = mongoose.model("Post", postSchema);


module.exports = Post;
