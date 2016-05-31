var mongoose = require("mongoose");
var mongooseAutoIncrement = require("mongoose-auto-increment");
var Schema = mongoose.Schema;


mongooseAutoIncrement.initialize(mongoose.connection);


var postSchema = new Schema({
  title: {type: String, unique: true},
  content: {type: String}
});


postSchema.plugin(mongooseAutoIncrement.plugin, {model: "Post", startAt: 1});


var Post = mongoose.model("Post", postSchema);


module.exports = Post;
