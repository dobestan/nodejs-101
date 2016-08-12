var mongoose = require("mongoose");


var commentSchema = new mongoose.Schema({
  content: String,

  created_at: Date,
  updated_at: Date
});


commentSchema.pre("save", function(next) {
  var comment = this;

  comment.created_at = comment.created_at || new Date();
  comment.updated_at = new Date();

  next();
});


// 1. Model 에 대한 구조 ( Schema ) 를 생성한다.
var postSchema = new mongoose.Schema({
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  title: String,
  content: String,

  created_at: Date,
  updated_at: Date,

  comments: [commentSchema]  // sub document
                             // 60MB
});


postSchema.pre("save", function(next) {
  var post = this;

  post.created_at = post.created_at || new Date();
  post.updated_at = new Date();

  console.log("새로운 포스트가 생성되었습니다: " + post.title);
  next();
});


// 2. 생성된 Schema 를 바탕으로 실제 Model 을 생성한다.
var Post = mongoose.model("Post", postSchema);


module.exports = Post;
