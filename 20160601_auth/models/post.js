var mongoose = require("mongoose");
var mongooseAutoIncrement = require("mongoose-auto-increment");
var Schema = mongoose.Schema;


mongooseAutoIncrement.initialize(mongoose.connection);


var postSchema = new Schema({
  title: {type: String, unique: true},
  content: {type: String},

  createdAt: Date,
  updatedAt: Date
});


postSchema.pre("save", function(next) {
  var currentDate = new Date();

  if (!this.createdAt) this.createdAt = currentDate;
  this.updatedAt = currentDate;

  next();
});


postSchema.plugin(mongooseAutoIncrement.plugin, {model: "Post", startAt: 1});


var Post = mongoose.model("Post", postSchema);


module.exports = Post;
