module.exports.logMiddleware = function(req, res) {
  console.log("Request on " + req.url + " at " + new Date());
}

// MVC - Model(Data, Business Logic), View(HTML), Controller(M,V 연결)

// Reqest
// -----------------------------------------Middleware1 ( Log )
// ------------          -------     -------Middleware2 ( loginRequired )
// Router ( URL 처리 ) => "/", "/about/", "/api/csv/_____"
// Controller           Controller Controller Controller              + utils
//                       View   View       Model(DB,CSV)
// -----------------------------------------Middleware1 ( Log )
//                                         View ( Renderer )
//
// -----------------------------------------Middleware1 ( Log )
// -----------------------------------------Middleware1 ( Log )
//                                         Response
