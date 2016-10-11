var request = require("request");


// 1. API Endpoint (URL)
// 2. HTTP Method
// 3. Headers
// 4. Data


module.exports = function(sender, receiver, content, callback) {
  var requestOptions = {
    url: "http://api.openapi.io/ppurio/1/message/sms/dobestan/",
    headers: {
      "x-waple-authorization": "MTkyMC0xNDEzODU0NTAwMzU3LTllM2VkOTM3LTYwMTEtNGU2Zi1iZWQ5LTM3NjAxMTNlNmYyMg==",
    },
    form: {
      "send_phone": sender,
      "dest_phone": receiver,
      "msg_body": content
    }
  };

  request.post(requestOptions, function(error, response, body) {
    if (error) return callback(error, null);
    return callback(error, body);
  });
}
