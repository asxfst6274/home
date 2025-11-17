const fs = require("fs");
const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const dataFile = require("../../dataFile");
const Beneficiary = require("../../models/beneficiary");
const User = require("../../models/user");
const copyFile = require("../../util/copyFile");
const deleteFile = require("../../util/deleteFile");

exports.getBeneficiaries = async (req, res, next) => {
  const beneficiaries = await Beneficiary.find({ user: req.user._id }).sort({
    updatedAt: -1,
  });
  res.render("main/beneficiaries", {
    title: "User Profile",
    beneficiaries,
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    message: req.flash("message")[0],
  });
};

exports.getAddBeneficiary = (req, res, next) => {
  res.render("main/add-beneficiary", {
    title: "User Profile",
    editing: false,
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    message: req.flash("message")[0],
    accountMode: req.flash("beneficiary-accountMode")[0],
    bank: req.flash("beneficiary-bank")[0],
    routing: req.flash("beneficiary-routing")[0],
    accountNumber: req.flash("beneficiary-accountNumber")[0],
    name: req.flash("beneficiary-name")[0],
    paypalEmail: req.flash("beneficiary-paypalEmail")[0],
    cashAppUsername: req.flash("beneficiary-cashAppUsername")[0],
    coin: req.flash("beneficiary-coin")[0],
    wallet: req.flash("beneficiary-wallet")[0],
    profile: req.flash("beneficiary-profile")[0],
  });
};

exports.getEditBeneficiary = async (req, res, next) => {
  const id = req.params.beneficiaryId;
  if (!mongoose.Types.ObjectId.isValid(id)) return next();
  req.flash("beneficiary-id", id);
  if (!req.flash("beneficiary-editing")[0]) {
    const beneficiary = await Beneficiary.findById(id);
    if (!beneficiary) return next();
    req.flash("beneficiary-accountMode", beneficiary.accountMode);
    req.flash("beneficiary-bank", beneficiary.bank);
    req.flash("beneficiary-routing", beneficiary.routing);
    req.flash("beneficiary-accountNumber", beneficiary.accountNumber);
    req.flash("beneficiary-name", beneficiary.name);
    req.flash("beneficiary-paypalEmail", beneficiary.paypalEmail);
    req.flash("beneficiary-cashAppUsername", beneficiary.cashAppUsername);
    req.flash("beneficiary-coin", beneficiary.coin);
    req.flash("beneficiary-wallet", beneficiary.wallet);
    req.flash("beneficiary-profile", beneficiary.profile);
  }
  res.render("main/add-beneficiary", {
    title: "User Profile",
    editing: true,
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    message: req.flash("message")[0],
    id: req.flash("beneficiary-id")[0],
    accountMode: req.flash("beneficiary-accountMode")[0],
    bank: req.flash("beneficiary-bank")[0],
    routing: req.flash("beneficiary-routing")[0],
    accountNumber: req.flash("beneficiary-accountNumber")[0],
    name: req.flash("beneficiary-name")[0],
    paypalEmail: req.flash("beneficiary-paypalEmail")[0],
    cashAppUsername: req.flash("beneficiary-cashAppUsername")[0],
    coin: req.flash("beneficiary-coin")[0],
    wallet: req.flash("beneficiary-wallet")[0],
    profile: req.flash("beneficiary-profile")[0],
  });
};

exports.postCheckAccountNumber = async (req, res, next) => {
  try {
    const accountNumber = req.body.accountNumber;
    const benId = req.body.id;
    const userId = req.user._id;

    const beneficiary = !mongoose.Types.ObjectId.isValid(benId)
      ? await Beneficiary.findOne({
          user: userId,
          accountNumber: accountNumber,
        })
      : await Beneficiary.findOne({
          user: userId,
          accountNumber: accountNumber,
          _id: { $ne: benId },
        });

    if (beneficiary) {
      return res.json({
        status: true,
        success: false,
        message:
          "A beneficiary with identical account number already exist on your account",
      });
    }

    res.json({
      status: true,
      success: true,
      message: "Confirm",
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

exports.postCheckPaypalEmail = async (req, res, next) => {
  try {
    const paypalEmail = req.body.paypalEmail;
    const benId = req.body.id;
    const userId = req.user._id;

    const beneficiary = !mongoose.Types.ObjectId.isValid(benId)
      ? await Beneficiary.findOne({
          user: userId,
          paypalEmail: paypalEmail,
        })
      : await Beneficiary.findOne({
          user: userId,
          paypalEmail: paypalEmail,
          _id: { $ne: benId },
        });

    if (beneficiary) {
      return res.json({
        status: true,
        success: false,
        message:
          "A beneficiary with identical paypal email already exist on your account",
      });
    }

    res.json({
      status: true,
      success: true,
      message: "Confirm",
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

exports.postCheckCashAppUsername = async (req, res, next) => {
  try {
    const cashAppUsername = req.body.cashAppUsername;
    const benId = req.body.id;
    const userId = req.user._id;

    const beneficiary = !mongoose.Types.ObjectId.isValid(benId)
      ? await Beneficiary.findOne({
          user: userId,
          cashAppUsername: cashAppUsername,
        })
      : await Beneficiary.findOne({
          user: userId,
          cashAppUsername: cashAppUsername,
          _id: { $ne: benId },
        });

    if (beneficiary) {
      return res.json({
        status: true,
        success: false,
        message:
          "A beneficiary with identical cash app username already exist on your account",
      });
    }

    res.json({
      status: true,
      success: true,
      message: "Confirm",
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

exports.postCheckWallet = async (req, res, next) => {
  try {
    const wallet = req.body.wallet;
    const benId = req.body.id;
    const userId = req.user._id;

    const beneficiary = !mongoose.Types.ObjectId.isValid(benId)
      ? await Beneficiary.findOne({
          user: userId,
          wallet: wallet,
        })
      : await Beneficiary.findOne({
          user: userId,
          wallet: wallet,
          _id: { $ne: benId },
        });

    if (beneficiary) {
      return res.json({
        status: true,
        success: false,
        message:
          "Your beneficiary with identical wallet address already exist on your account",
      });
    }

    res.json({
      status: true,
      success: true,
      message: "Confirm",
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
        message: `You can't add yourself as a beneficiary`,
      });
    }

    res.json({
      status: true,
      success: true,
      message: "Confirm",
      data: {
        name: user.name,
        profile: user.profile,
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

exports.postBeneficiary = async (req, res, next) => {
  try {
    const accountMode = req.body.accountMode;
    const bank = req.body.bank;
    const routing = req.body.routing;
    const accountNumber = req.body.accountNumber;
    const name = req.body.name;
    const paypalEmail = req.body.paypalEmail;
    const cashAppUsername = req.body.cashAppUsername;
    const coin = req.body.coin;
    const wallet = req.body.wallet;
    let profile = req.body.beneficiary
      ? req.body.beneficiary[0].profile.filename
      : undefined;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("beneficiary-accountMode", accountMode);
      req.flash("beneficiary-bank", bank);
      req.flash("beneficiary-routing", routing);
      req.flash("beneficiary-accountNumber", accountNumber);
      req.flash("beneficiary-name", name);
      req.flash("beneficiary-paypalEmail", paypalEmail);
      req.flash("beneficiary-cashAppUsername", cashAppUsername);
      req.flash("beneficiary-coin", coin);
      req.flash("beneficiary-wallet", wallet);
      req.flash("beneficiary-profile", profile);

      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/add-beneficiary");
    }

    let beneficiary;

    switch (accountMode) {
      case "same":
        const user = await User.findOne({ accountNumber: accountNumber });

        if (!profile && user.profile)
          profile = copyFile("user", "beneficiary", user.profile, [
            "profile",
            "icon",
          ]);

        beneficiary = new Beneficiary({
          accountMode,
          name,
          accountNumber,
          bank,
          user: req.user._id,
          profile,
        });
        break;
      case "others":
        beneficiary = new Beneficiary({
          accountMode,
          name,
          accountNumber,
          bank,
          routing,
          user: req.user._id,
          profile,
        });
        break;
      case "crypto":
        beneficiary = new Beneficiary({
          accountMode,
          name,
          coin,
          wallet,
          user: req.user._id,
          profile,
        });
        break;
      case "paypal":
        beneficiary = new Beneficiary({
          accountMode,
          name,
          paypalEmail,
          user: req.user._id,
          profile,
        });
        break;
      case "cashApp":
        beneficiary = new Beneficiary({
          accountMode,
          name,
          cashAppUsername,
          user: req.user._id,
          profile,
        });
        break;
    }

    await beneficiary.save();

    req.flash("success", true);
    req.flash("message", "New beneficiary has been added successully");

    res.redirect("/beneficiaries");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postEditBeneficiary = async (req, res, next) => {
  try {
    const id = req.body.id;
    const accountMode = req.body.accountMode;
    const bank = req.body.bank;
    const routing = req.body.routing;
    const accountNumber = req.body.accountNumber;
    const name = req.body.name;
    const paypalEmail = req.body.paypalEmail;
    const cashAppUsername = req.body.cashAppUsername;
    const coin = req.body.coin;
    const wallet = req.body.wallet;
    let profile = req.body.beneficiary
      ? req.body.beneficiary[0].profile.filename
      : undefined;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("beneficiary-editing", true);
      req.flash("beneficiary-accountMode", accountMode);
      req.flash("beneficiary-bank", bank);
      req.flash("beneficiary-routing", routing);
      req.flash("beneficiary-accountNumber", accountNumber);
      req.flash("beneficiary-name", name);
      req.flash("beneficiary-paypalEmail", paypalEmail);
      req.flash("beneficiary-cashAppUsername", cashAppUsername);
      req.flash("beneficiary-coin", coin);
      req.flash("beneficiary-wallet", wallet);
      req.flash("beneficiary-profile", profile);

      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/edit-beneficiary/" + id);
    }

    const beneficiary = await Beneficiary.findById(id);

    if (beneficiary.profile) {
      if (profile) {
        deleteFile("beneficiary", beneficiary.profile);
      } else {
        profile = beneficiary.profile;
      }
    }

    beneficiary.profile = profile;
    beneficiary.accountMode = accountMode;
    beneficiary.name = name;

    switch (accountMode) {
      case "same":
        beneficiary.bank = bank;
        beneficiary.accountNumber = accountNumber;
        beneficiary.routing = undefined;
        beneficiary.paypalEmail = undefined;
        beneficiary.cashAppUsername = undefined;
        beneficiary.coin = undefined;
        beneficiary.wallet = undefined;
        break;
      case "others":
        beneficiary.bank = bank;
        beneficiary.routing = routing;
        beneficiary.accountNumber = accountNumber;
        beneficiary.paypalEmail = undefined;
        beneficiary.cashAppUsername = undefined;
        beneficiary.coin = undefined;
        beneficiary.wallet = undefined;
        break;
      case "crypto":
        beneficiary.coin = coin;
        beneficiary.wallet = wallet;
        beneficiary.bank = undefined;
        beneficiary.routing = undefined;
        beneficiary.accountNumber = undefined;
        beneficiary.paypalEmail = undefined;
        beneficiary.cashAppUsername = undefined;
        break;
      case "paypal":
        beneficiary.paypalEmail = paypalEmail;
        beneficiary.coin = undefined;
        beneficiary.wallet = undefined;
        beneficiary.bank = undefined;
        beneficiary.routing = undefined;
        beneficiary.accountNumber = undefined;
        beneficiary.cashAppUsername = undefined;
        break;
      case "cashApp":
        beneficiary.cashAppUsername = cashAppUsername;
        beneficiary.paypalEmail = undefined;
        beneficiary.coin = undefined;
        beneficiary.wallet = undefined;
        beneficiary.bank = undefined;
        beneficiary.routing = undefined;
        beneficiary.accountNumber = undefined;
        break;
    }

    await beneficiary.save();

    req.flash("success", true);
    req.flash("message", "Beneficiary has been updated successully");

    res.redirect("/beneficiaries");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postDeleteBeneficiary = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("message", "Something went wrong, please try again later");
      return res.redirect("/beneficiaries");
    }

    const id = req.body.beneficiaryId;
    const beneficiary = await Beneficiary.findById(id);
    const profile = beneficiary.profile;

    if (profile) deleteFile("beneficiary", profile);

    await Beneficiary.findByIdAndRemove(id);

    req.flash("success", true);
    req.flash("message", "Beneficiary has been removed successfully");

    res.redirect("/beneficiaries");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postTransferToBeneficiary = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("errors", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/transfer");
    }

    const beneficiaryId = req.body.beneficiaryId;
    const beneficiary = await Beneficiary.findById(beneficiaryId);

    req.flash("transfer", beneficiary);

    res.redirect("/transfer");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
