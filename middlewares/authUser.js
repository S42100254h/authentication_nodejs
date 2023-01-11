const authUser = (req, res, next) => {
  if (!req.session.userId) {
    req.session.url = req.url;
    return res.redirect("login");
  }
  next();
};

module.exports = authUser;
