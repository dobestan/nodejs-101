var sendSms = require("./sms");


var sender = process.argv[2];
var receiver = process.argv[3];
var content = process.argv[4];


sendSms(sender, receiver, content);
