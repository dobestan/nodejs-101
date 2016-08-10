var mongoose = require("mongoose");


var commentSchema = new mongoose.Schema({
  content: String,
  created_at: Date
});


var postSchema = new mongoose.Schema({
  title: String,
  content: String,

  // timestamps
  created_at: Date,
  updated_at: Date,

  comments: [commentSchema]
});


postSchema.pre("save", function(next) {
  var post = this;

  this.created_at = this.created_at || new Date();
  this.updated_at = new Date();

  return next();
});



commentSchema.pre("save", function(next) {
  this.created_at = this.created_at || new Date();
  next();
});


var Post = mongoose.model("Post", postSchema);


module.exports = Post;
