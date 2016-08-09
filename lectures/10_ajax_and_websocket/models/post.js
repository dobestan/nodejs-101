var mongoose = require("mongoose");


var postSchema = new mongoose.Schema({
  title: String,
  content: String,
});


var commentSchema = new mongoose.Schema({
  content: String,
});


var Post = mongoose.model("Post", postSchema);


module.exports = Post;
