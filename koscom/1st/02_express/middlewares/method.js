function getPostDataMiddleware() {
  return function(req, res, next) {
    // HTTP POST Method
    var data = "";

    req.on("data", function(chunk) {
      data += chunk;
    });

    req.on("end", function() {
      var postData = {};

      data.split("&").forEach(function(keyValue) {
        var key = keyValue.split("=")[0];
        var value = keyValue.split("=")[1];

        postData[key] = value;
      });
      // return res.json(postData);
      // hello=world&key=value&nodejs=express

      req.myPostData = postData;
      next();  // return `function(req, res, next)`
    });
  }
}


module.exports.getPostDataMiddleware = getPostDataMiddleware;
