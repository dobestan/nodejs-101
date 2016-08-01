var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var contactSchema = new Schema({
  name: String,
  email: String,
  phonenumber: String,
  createdAt: Date,
  updatedAt: Date
});


contactSchema.pre("save", function(next) {
  var currentDate = new Date();
  if (!this.createdAt) this.createdAt = currentDate;
  this.updatedAt = currentDate;

  console.log("새로운 연락처가 생성되었습니다.");

  next();
});


var Contact = mongoose.model("Contact", contactSchema);


module.exports = Contact;
