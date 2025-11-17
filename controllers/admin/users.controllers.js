const { validationResult } = require("express-validator");
const User = require("../../models/user");
const Chat = require("../../models/chat");
const bcrypt = require("bcryptjs");
const Transaction = require("../../models/transaction");
const { dollar } = require("../../helpers");
const deleteFile = require("../../util/deleteFile");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).lean();

    const usersDoc = [];

    for (const user of users) {
      const id = user._id;
      const pendingDeposit = await Transaction.find({
        user: id,
        status: "ongoing",
        type: "deposit",
      }).countDocuments();

      const pendingTransfer = await Transaction.find({
        user: id,
        status: "ongoing",
        type: "transfer",
      }).countDocuments();

      user.pendingDeposit = pendingDeposit;
      user.pendingTransfer = pendingTransfer;

      usersDoc.push(user);
    }

    res.render("admin/users", {
      users: usersDoc,
      success: req.flash("success")[0],
      error: req.flash("error")[0],
      message: req.flash("message")[0],
      breadcrumb1: ["Users"],
      breadcrumb2: [],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postViewUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("success", false);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/users");
    }

    const userId = req.body.userId;

    req.session.viewMode = true;
    await req.session.save();
    req.session.viewUserId = userId;
    await req.session.save();

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.postActionUser = (action) => {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        req.flash("error", true);
        req.flash("message", errors.array()[0].msg);

        return res.redirect("/users");
      }

      const userId = req.body.userId;
      const user = await User.findById(userId);

      if (user.role === "admin") {
        req.flash("error", true);
        req.flash(
          "message",
          `Users with admin role can not be ${
            action === "delete" ? "deleted" : action + "ed"
          }`
        );

        return res.redirect("/users");
      }

      switch (action) {
        case "approve":
          user.status = "active";
          await user.save();
          break;
        case "delete":
          await Transaction.deleteMany({ user: user._id });
          await user.remove();
          if (user.profile) deleteFile("user", user.profile);
          break;
        case "block":
          user.status = "suspended";
          await user.save();
          break;
        case "unblock":
          user.status = "active";
          await user.save();
          break;
      }

      req.flash("success", true);
      req.flash(
        "message",
        `${user.name} (${user.accountNumber}) has been ${
          action === "delete" || action === "approved"
            ? action + "d"
            : action + "ed"
        }`
      );

      return res.redirect("/users");
    } catch (err) {
      next(err);
    }
  };
};

exports.postAddFunds = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("success", false);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/users");
    }

    const userId = req.body.userId;
    const amount = req.body.amount;

    const user = await User.findById(userId);

    user.balance += +amount;

    await user.save();

    req.flash("error", false);
    req.flash("success", true);
    req.flash(
      "message",
      `${user.name} (${user.accountNumber}) has been credited with ${dollar(
        amount
      )}
      `
    );

    return res.redirect("/users");
  } catch (err) {
    next(err);
  }
};

exports.postSendMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("success", false);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/users");
    }

    const userId = req.body.userId;
    const message = req.body.message;

    const user = await User.findById(userId);

    const users = await User.find().sort({ updatedAt: -1 });
    const chat = new Chat({
      from: "admin",
      message: message,
      user: userId,
    });

    await chat.save();

    req.flash("error", false);
    req.flash("success", true);
    req.flash(
      "message",
      `Message has been sent to ${user.name} (${user.username})
      `
    );

    return res.redirect("/users");
  } catch (err) {
    next(err);
  }
};

exports.postSendEmail = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("success", false);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/users");
    }

    const userId = req.body.userId;
    const subject = req.body.subject;
    const message = req.body.message;

    const user = await User.findById(userId);

    // EMAIL LOGIC HERE

    req.flash("error", false);
    req.flash("success", true);
    req.flash(
      "message",
      `Email has been sent to ${user.name} (${user.username})
      `
    );
    return res.redirect("/users");
  } catch (err) {
    next(err);
  }
};

exports.postUser = (action, errorEndpoint, successMessage) => {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const _id = req.body._id;
      if (!errors.isEmpty()) {
        req.flash("error", true);
        req.flash("message", errors.array()[0].msg);

        req.flash("user", req.body);

        return res.redirect(errorEndpoint + (action === "edit" ? _id : ""));
      }

      switch (action) {
        case "cot":
          await User.updateOne({ _id }, { cotCode: req.body.cotCode });
          break;
      }

      req.flash("success", true);
      req.flash("message", successMessage);

      return res.redirect("/users");
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};
