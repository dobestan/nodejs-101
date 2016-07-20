var http = require("http");
var querystring = require("querystring");


function sendSms(sender, receiver, content) {
  var requestData = querystring.stringify({
    "send_phone": sender,
    "dest_phone": receiver,
    "msg_body": content
  });


  var requestOptions = {
    hostname: "api.openapi.io",
    path: "/ppurio/1/message/sms/dobestan/",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": requestData.length,

      "x-waple-authorization": "MTkyMC0xNDEzODU0NTAwMzU3LTllM2VkOTM3LTYwMTEtNGU2Zi1iZWQ5LTM3NjAxMTNlNmYyMg==",
    }
  };


  var request = http.request(
    requestOptions,
    function(response) {
      var data = "";

      response.on("data", function(chunk) {
        data += chunk;
      });

      response.on("end", function() {
        console.log(data);
      });
    }
  );


  request.on("error", function(error) {
    console.log(error);
  });


  request.write(requestData);


  request.end();
}


module.exports = sendSms;
