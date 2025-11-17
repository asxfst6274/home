const { validationResult } = require("express-validator");
const Crypto = require("../../models/crypto");

exports.getDepositMethod = async (req, res, next) => {
  const methods = await Crypto.find().sort({ createdAt: -1 });
  res.render("admin/deposit-coins", {
    success: req.flash("success")[0],
    error: req.flash("error")[0],
    message: req.flash("message")[0],
    methods,
    breadcrumb1: ["Deposits Methods"],
    breadcrumb2: [],
  });
};

exports.getAddDepositMethod = (req, res, next) => {
  try {
    req.flash("depositMethod", {});
    res.render("admin/deposit-coin-add", {
      success: req.flash("success")[0],
      error: req.flash("error")[0],
      message: req.flash("message")[0],
      depositMethod: req.flash("depositMethod")[0],
      editing: false,
      breadcrumb1: ["Deposits Method", "/deposit-methods"],
      breadcrumb2: ["Create"],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getEditDepositMethod = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next();
    }

    const methodId = req.params.methodId;
    const methods = await Crypto.findById(methodId);
    req.flash("depositMethod", methods);
    res.render("admin/deposit-coin-add", {
      success: req.flash("success")[0],
      error: req.flash("error")[0],
      message: req.flash("message")[0],
      depositMethod: req.flash("depositMethod")[0],
      editing: true,
      breadcrumb1: ["Deposits Method", "/deposit-methods"],
      breadcrumb2: ["Edit"],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postDepositMethod = (action, errorEndpoint, successMessage) => {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const _id = req.body._id || req.body.methodId;

      if (!errors.isEmpty()) {
        req.flash("error", true);
        req.flash("message", errors.array()[0].msg);

        req.flash("depositMethod", req.body);

        return res.redirect(errorEndpoint + `${action === "edit" ? _id : ""}`);
      }

      switch (action) {
        case "create":
          await Crypto.create(req.body);
          break;
        case "edit":
          await Crypto.updateOne({ _id }, req.body);
          break;
        case "delete":
          await Crypto.findByIdAndDelete({ _id });
          break;
        case "enabled":
          await Crypto.updateOne({ _id }, { status: "enabled" });
          break;
        case "disabled":
          await Crypto.updateOne({ _id }, { status: "disabled" });
          break;
      }

      req.flash("success", true);
      req.flash("message", successMessage);

      return res.redirect("/deposit-methods");
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};
