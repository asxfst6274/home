const dataFile = require("../../dataFile");
const User = require("../../models/user");
const Transaction = require("../../models/transaction");
const { validationResult } = require("express-validator");
const Notification = require("../../models/notification");
const Beneficiary = require("../../models/beneficiary");
const copyFile = require("../../util/copyFile");
const { dollar, toTitle } = require("../../helpers");
const sendMail = require("../../util/sendMail");
const Settings = require("../../models/settings");

exports.getTransfer = async (req, res, next) => {
  req.flash("transfer", {
    accountMode: req.query.method,
  });
  const settings = await Settings.findOne();
  res.render("main/transfer", {
    title: "User Profile",
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    message: req.flash("message")[0],
    transfer: req.flash("transfer")[0],
    settings,
  });
};

exports.getUser = async (req, res, next) => {
  try {
    const accountNumber = req.params.accountNumber;

    const user = await User.findOne({ accountNumber: accountNumber });

    if (!user) {
      return res.json({
        status: true,
        success: false,
        message: `No user of ${dataFile.name} is attached to this account number`,
      });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.json({
        status: true,
        success: false,
        message: `You can't transfer money to the same account`,
      });
    }

    res.json({
      status: true,
      success: true,
      message: "Confirm",
      data: {
        name: user.name,
      },
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      success: false,
      message: "something went wrong",
    });
  }
};

exports.postTransfer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("transfer", req.body);

      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/transfer");
    }

    req.body.user = req.user._id;
    await User.transfer(req.body);

    req.flash("success", true);
    req.flash("message", "Transfer Successfull");

    res.redirect("/transfer");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
