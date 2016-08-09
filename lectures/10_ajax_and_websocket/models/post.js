var mongoose = require("mongoose");


var postSchema = new mongoose.Schema({
  title: String,
  content: String,

  // timestamps
  created_at: Date,
  updated_at: Date
});


postSchema.pre("save", function(next) {
  var post = this;

  this.created_at = this.created_at || new Date();
  this.updated_at = new Date();

  return next();
});


var commentSchema = new mongoose.Schema({
  content: String,
});


var Post = mongoose.model("Post", postSchema);


module.exports = Post;
