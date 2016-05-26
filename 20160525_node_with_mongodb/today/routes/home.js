var express = require('express');

var router = express.Router();


// GET, POST 데이터를 받는 방법 복습 - bodyParser, request.query, request.body
router.get("/", function(request, response) {
  // GET Parameter 를 그대로 json 형태로 response 에 담아서 보내는 기능
  return response.json(request.query)
});

router.post("/", function(request, response) {
  // POST data 를 그대로 json 형태로 Response 에 담아서 보내는 기능
  return response.json(request.body);
});


module.exports = router;
