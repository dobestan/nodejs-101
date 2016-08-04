function loginRequired(request, response, next) {
  if (!request.session.user) {
    request.flash("error", "로그인이 필요한 페이지입니다.");
    return response.redirect("/login/");
  }

  next();
}


module.exports.loginRequired = loginRequired;
