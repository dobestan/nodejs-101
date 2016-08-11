function loginRequired() {
  return function(req, res, next) {
    if (!req.session.user) {
      req.flash("error", "로그인이 필요한 페이지입니다.");
      return res.redirect("/login/?next=" + req.originalUrl);
    }

    next();
  }
}


module.exports.loginRequired = loginRequired;
