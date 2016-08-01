var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var movieSchema = new Schema({
  title: String,
  content: String,
  image: String,
  isPublic: {
    type: Boolean,
    default: true
  }
});


var Movie = mongoose.model("Movie", movieSchema);


module.exports = Movie;
