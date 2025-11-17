const { validationResult } = require("express-validator");
const dataFile = require("../../dataFile");
const { toTitle, dollar } = require("../../helpers");
const Beneficiary = require("../../models/beneficiary");
const Notification = require("../../models/notification");
const Transaction = require("../../models/transaction");
const User = require("../../models/user");
const copyFile = require("../../util/copyFile");
const deleteFile = require("../../util/deleteFile");
const sendMail = require("../../util/sendMail");

// /////////
// TRANSFER
// /////////////

exports.getTransfer = async (req, res, next) => {
  const transfers = await Transaction.find({
    type: "transfer",
    // move: "debit",
  }).sort({
    createdAt: -1,
  });

  for (const transfer of transfers) {
    await transfer.populate("user", "name accountNumber profile");
    if (!transfer.user) {
      await transfer.deleteOne();
    }
  }

  res.render("admin/transfers", {
    success: req.flash("success")[0],
    error: req.flash("error")[0],
    message: req.flash("message")[0],
    transfers,
    breadcrumb1: ["Transfer"],
    breadcrumb2: [],
  });
};

exports.getAddTransfer = async (req, res, next) => {
  try {
    const users = await User.find({ status: "active" }).sort({ createdAt: -1 });
    req.flash("transfer", {});
    res.render("admin/transfer-add", {
      users,
      editing: false,
      transfer: req.flash("transfer")[0],
      success: req.flash("success")[0],
      error: req.flash("error")[0],
      message: req.flash("message")[0],
      breadcrumb1: ["Transfer", "/transfers"],
      breadcrumb2: ["Create"],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getEditTransfer = async (req, res, next) => {
  try {
    const transferId = req.params.transferId;
    const transfer = await Transaction.findById(transferId).lean();
    const users = await User.find({ status: "active" }).sort({ createdAt: -1 });
    req.flash("transfer", transfer);

    res.render("admin/transfer-add", {
      users,
      editing: true,
      transfer: req.flash("transfer")[0],
      success: req.flash("success")[0],
      error: req.flash("error")[0],
      message: req.flash("message")[0],
      breadcrumb1: ["Transfer", "/transfers"],
      breadcrumb2: ["Edit"],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postTransfer = async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   console.log(req.body);
    //   req.flash("transfer", req.body);

    //   req.flash("error", true);
    //   req.flash("message", errors.array()[0].msg);

    //   return res.redirect("/transfer/add");
    // }

    if (req.body.accountMode === "same") {
      const receiver = await User.findById(req.body.receiver);
      req.body.accountNumber = receiver.accountNumber;
      req.body.name = receiver.name;
    }

    await User.transfer(req.body);

    req.flash("success", true);
    req.flash("message", "Transfer Successful");

    res.redirect("/transfers");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postEditTransfer = async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    console.log(req.body);
    // if (!errors.isEmpty()) {
    //   req.flash("transfer", req.body);

    //   console.log(errors.array()[0]);

    //   req.flash("error", true);
    //   req.flash("message", errors.array()[0].msg);

    //   return res.redirect("/transfer/edit/" + req.body._id);
    // }

    if (req.body.accountMode === "same") {
      const receiver = await User.findById(req.body.receiver);
      req.body.accountNumber = receiver.accountNumber;
      req.body.name = receiver.name;
    }

    await User.editTransfer(req.body);

    req.flash("success", true);
    req.flash("message", "Transfer Edited Successfully");

    res.redirect("/transfers");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// /////////
// DEPOSIT
// /////////////

exports.getDeposit = async (req, res, next) => {
  const deposits = await Transaction.find({
    type: "deposit",
    move: "credit",
  }).sort({
    createdAt: -1,
  });

  for (const deposit of deposits) {
    await deposit.populate("user", "name accountNumber profile");

    if (!deposit.user) {
      await deposit.deleteOne();
    }
  }

  res.render("admin/deposits", {
    success: req.flash("success")[0],
    error: req.flash("error")[0],
    message: req.flash("message")[0],
    deposits,
    breadcrumb1: ["Deposits"],
    breadcrumb2: [],
  });
};

exports.getAddDeposit = (req, res, next) => {
  res.render("admin/deposit-add");
};

exports.getEditDeposit = (req, res, next) => {
  res.render("admin/deposit-add");
};

exports.postActionTransaction = (action) => {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const transactionId = req.body.transactionId;
      const transaction = await Transaction.findById(transactionId);

      if (!errors.isEmpty()) {
        req.flash("error", true);
        req.flash("success", false);
        req.flash("message", errors.array()[0].msg);

        return res.redirect(`/${transaction.type}s`);
      }

      if (action === "delete") {
        await transaction.remove();
        if (transaction.profile) deleteFile("transaction", transaction.profile);
      } else if (action === "cancel") {
        transaction.status = "cancelled";
        await transaction.save();
      } else if (action === "complete") {
        transaction.status = action;
        await transaction.save();

        if (
          transaction.type === "transfer" &&
          transaction.accountMode === "same" &&
          transaction.move === "debit"
        )
          transaction.fundReceiver();

        if (transaction.type === "deposit") transaction.fundDepositor();
      }

      req.flash("error", false);
      req.flash("success", true);
      req.flash(
        "message",
        `Record has been ${
          action === "delete"
            ? "deleted"
            : action === "complete"
            ? "Approved"
            : "cancelled"
        }`
      );

      return res.redirect(`/${transaction.type}s`);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};
