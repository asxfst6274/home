const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    // const d = Model;
    if (!req.session.userId) return next();

    const user = await User.findById(req.session.userId);
    if (!user) return next();

    if (user.status === "suspended") {
      req.session.userId = undefined;
      const lastPath = req.url;
      res.cookie("lastPath", lastPath, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      req.flash("error", true);
      req.flash("message", "Your account is under review");
      return next();
    }

    if (
      req.session.viewMode &&
      req.session.viewUserId &&
      user.role === "admin"
    ) {
      const viewUser = await User.findById(req.session.viewUserId);
      if (!viewUser) return next();
      req.user = viewUser;
      req.isLoggedIn = true;
      req.isAdmin = true;
      req.inAdmin = false;
      return next();
    }

    req.user = user;
    req.isLoggedIn = true;
    req.isAdmin = user.role === "admin";
    req.inAdmin = req.session.inAdmin && req.isAdmin;

    next();
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
};
