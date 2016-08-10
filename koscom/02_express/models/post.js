var mongoose = require("mongoose");


// 1. Model 에 대한 구조 ( Schema ) 를 생성한다.
var postSchema = new mongoose.Schema({
  title: String,
  content: String,
  created_at: Date,
  updated_at: Date
});


// 2. 생성된 Schema 를 바탕으로 실제 Model 을 생성한다.
var Post = mongoose.model("Post", postSchema);


module.exports = Post;
