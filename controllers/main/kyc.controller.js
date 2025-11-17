const { validationResult } = require("express-validator");
const Kyc = require("../../models/kyc");
const sendMail = require("../../util/sendMail");
const dataFile = require("../../dataFile");

exports.getKyc = async (req, res, next) => {
  const kyc = await Kyc.findOne({ user: req.user._id }).sort({ createdAt: -1 });
  res.render("main/kyc", {
    title: "User Profile",
    kyc,
    type: req.flash("kyc-type")[0],
    image: req.flash("kyc-image")[0],
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    message: req.flash("message")[0],
  });
};

exports.postKyc = async (req, res, next) => {
  try {
    const type = req.body.type;
    const image = req.body.kyc && req.body.kyc[0].original.filename;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("kyc-type", type);
      req.flash("kyc-image", image);

      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/kyc");
    }

    if (!image) {
      req.flash("error", true);
      req.flash("message", "Document image is required");

      return res.redirect("/kyc");
    }

    const kyc = new Kyc({
      type,
      image,
      user: req.user._id,
    });

    await kyc.save();

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const messageSubject = "KYC Uploaded";
      const messageContent = `${req.user.email} just uploaded a kyc document.`;

      sendMail(
        `${adminEmail}`,
        messageSubject,
        messageSubject,
        messageContent,
        "Goto Website",
        `${dataFile.url}`
      );
    }

    req.flash("success", true);
    req.flash("message", "Your KYC document has been submitted successfully");

    res.redirect("/kyc");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
