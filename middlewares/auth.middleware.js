function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }

  next();
}

function requireAdmin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }

  if (req.session.user.role !== "ADMIN") {
    return res.status(403).send("Bạn không có quyền truy cập trang này");
  }

  next();
}

function requireUser(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }

  if (req.session.user.role !== "CUSTOMER") {
    return res.status(403).send("Chỉ khách hàng mới truy cập được");
  }

  next();
}

module.exports = {
  requireLogin,
  requireAdmin,
  requireUser
};