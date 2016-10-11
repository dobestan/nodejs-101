// loginRequired 를 구현하면서, 원래 요청한 페이지로 Redirect
//
// 1. loginRequired Middleware 에서 Querystring 을 이용해서
//    next 라는 인자에 이전 URL 전달
// 2. login GET 부분에서 인자를 받아서 context 로 전달
// 3. login GET template 에서 hidden field 로 next field 만들기
// 4. login POST 부분에서 next 인자를 받아서 redirect

function loginRequired() {
  return function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.flash("error", "로그인이 필요한 페이지입니다.");
      return res.redirect("/login?next=" + req.url);
      // HTTP is stateless. ( 이전에 요청했던 페이지의 상태 )
      // Cookie, Session
      // Hidden Field
      // Querystring ( ?key=value ) (*)
    }
  }
}


module.exports.loginRequired = loginRequired;
