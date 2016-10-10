function loginRequired() {
  return function (req, res, next) {
    var isLogin = false;
    if (isLogin) {
      next();
    }

    return res.status(403).send("Login Required");
  }
}


module.exports.loginRequired = loginRequired;
