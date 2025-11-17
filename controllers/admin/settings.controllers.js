const { validationResult } = require("express-validator");
const Settings = require("../../models/settings");

exports.getSettings = async (req, res, next) => {
  const settings = await Settings.findOne();
  req.flash("settings", settings);
  res.render("admin/site-configuration", {
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    message: req.flash("message")[0],
    settings: req.flash("settings")[0],
    breadcrumb1: ["Settings"],
    breadcrumb2: [],
  });
};

exports.postSettings = (action, errorEndpoint, successMessage) => {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        req.flash("error", true);
        req.flash("message", errors.array()[0].msg);

        req.flash("settings", req.body);

        return res.redirect(errorEndpoint);
      }

      await Settings.updateOne({}, req.body);

      req.flash("success", true);
      req.flash("message", successMessage);

      return res.redirect("/settings");
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};
