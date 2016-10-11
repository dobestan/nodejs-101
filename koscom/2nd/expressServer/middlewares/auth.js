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
