const { validationResult } = require("express-validator");
const Kyc = require("../../models/kyc");
const deleteFile = require("../../util/deleteFile");

exports.getKyc = async (req, res, next) => {
  try {
    const kyc = await Kyc.find()
      .sort({ createdAt: -1 })
      .populate("user")
      .lean();

    res.render("admin/kyc", {
      kyc,
      success: req.flash("success")[0],
      error: req.flash("error")[0],
      message: req.flash("message")[0],
      breadcrumb1: ["Kyc"],
      breadcrumb2: [],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postActionKyc = (action) => {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        req.flash("error", true);
        req.flash("message", errors.array()[0].msg);

        return res.redirect("/user-kyc");
      }

      const kcyId = req.body.id;
      const kyc = await Kyc.findById(kcyId);

      if (!kyc) {
        req.flash("error", true);
        req.flash("message", "Kyc not found");

        return res.redirect("/user-kyc");
      }

      switch (action) {
        case "approved":
          kyc.status = "approved";
          await kyc.save();
          break;
        case "delete":
          await kyc.remove();
          if (kyc.image) deleteFile("kyc", kyc.image);
          break;
        case "rejected":
          kyc.status = "rejected";
          await kyc.save();
          break;
        case "pending":
          kyc.status = "pending";
          await kyc.save();
          break;
      }

      req.flash("success", true);
      req.flash(
        "message",
        ` ${action === "delete" ? "delete" : action} successful`
      );

      return res.redirect("/user-kyc");
    } catch (err) {
      next(err);
    }
  };
};
