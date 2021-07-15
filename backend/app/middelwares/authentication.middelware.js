const authenticationHandler = (req, res, next) => {
  if (!req.session.user || !req.cookies.user_sid) {
    res.status(401).send({ success: false });
  } else {
    next();
  }
};

module.exports = authenticationHandler;