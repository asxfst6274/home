exports.isVisitor = (req, res, next) => {
  if (req.isLoggedIn) {
    return res.redirect("/");
  }
  next();
};

exports.isUser = (req, res, next) => {
  if (!req.isLoggedIn) {
    const lastPath = req.route.path;
    res.cookie("lastPath", lastPath, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    return res.redirect("/login");
  } else if (req.inAdmin) {
    return res.redirect("/");
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (!req.isLoggedIn) {
    const lastPath = req.route.path;
    res.cookie("lastPath", lastPath, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    return res.redirect("/login");
  } else if (!req.isAdmin || !req.inAdmin) {
    return res.redirect("/");
  }
  next();
};

exports.visitor = (controller) => {
  return (req, res, next) => {
    if (!req.isLoggedIn) return controller(req, res, next);
    else next();
  };
};

exports.user = (controller) => {
  return (req, res, next) => {
    if (req.isLoggedIn && !req.inAdmin) {
      return controller(req, res, next);
    }
    if (!req.isLoggedIn) {
      const lastPath = req.route.path;
      res.cookie("lastPath", lastPath, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      return res.redirect("/login");
    }
    return next();
  };
};

exports.admin = (controller) => {
  return async (req, res, next) => {
    if (req.isLoggedIn && req.isAdmin && req.inAdmin) {
      return controller(req, res, next);
    } else {
      const lastPath = req.route.path;
      res.cookie("lastPath", lastPath, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      return res.redirect("/login");
    }
  };
};
