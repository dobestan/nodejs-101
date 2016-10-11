



var sms = require("./utils/sms");


sms("01022205736", "01022205736", "hello world", function(error, data) {
  console.log(data);
});
