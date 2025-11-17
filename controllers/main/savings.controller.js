const { validationResult } = require("express-validator");
const dataFile = require("../../dataFile");
const { dollar } = require("../../helpers");
const Notification = require("../../models/notification");
const Savings = require("../../models/savings");
const Transaction = require("../../models/transaction");
const User = require("../../models/user");
const sendEmail = require("../../util/sendEmail");
const sendMail = require("../../util/sendMail");

exports.getSavings = async (req, res, next) => {
  try {
    const savings = await Savings.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.render("main/my-savings", {
      title: "User Profile",
      savings,
      error: req.flash("error")[0],
      success: req.flash("success")[0],
      message: req.flash("message")[0],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postSavings = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    const category = req.body.category;
    const title = req.body.title;
    const target = req.body.target;

    if (!errors.isEmpty()) {
      req.flash("savings-category", category);
      req.flash("savings-title", title);
      req.flash("savings-target", target);
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/add-savings");
    }

    let color;

    switch (category) {
      case "business":
        color = "red";
        break;
      case "gaming":
        color = "blue";
        break;
      case "rent":
        color = "orange";
        break;
      case "bills":
        color = "slate";
        break;
      case "shopping":
        color = "green";
        break;
      case "sports":
        color = "violet";
        break;
      case "movies":
        color = "pink";
        break;
      case "vacation":
        color = "yellow";
        break;
      case "other":
        color = "stone";
        break;
      default:
        color = "stone";
    }

    const savings = new Savings({
      category,
      title,
      target,
      color,
      user: req.user._id,
    });

    await savings.save();

    const subject = "new savings plan";
    const message = `Your new savings plan ${
      savings.title
    } is up and ready to be complete, cant wait for you to hit your ${dollar(
      savings.target
    )} target.`;

    const notification = new Notification({
      type: "create-savings",
      subject,
      message,
      user: req.user._id,
    });

    await notification.save();

    req.flash("success", true);
    req.flash("message", "Savings plan created Successfully");

    res.redirect("/savings");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAddSavings = (req, res, next) => {
  res.render("main/new-savings", {
    title: "User Profile",
    category: req.flash("savings-category")[0],
    inputTitle: req.flash("savings-title")[0],
    target: req.flash("savings-target")[0],
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    message: req.flash("message")[0],
  });
};

exports.postAddMoney = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);
      return res.redirect("/savings");
    }

    const savingsId = req.body.savingsId;
    const amount = +req.body.amount;

    const savings = await Savings.findById(savingsId);
    savings.saved += amount;

    const userId = req.user._id;
    const user = await User.findById(userId);
    user.balance -= amount;

    await user.save();
    await savings.save();

    const transaction = new Transaction({
      status: "complete",
      type: "savings",
      name: savings.title,
      target: savings.target,
      category: savings.category,
      saved: savings.saved,
      color: savings.color,
      user: req.user._id,
      amount: amount,
      profile: "saving.png",
      move: "debit",
    });

    const messageSubject = `Savings plan Funded`;
    const messageContent = `You funded your ${
      savings.title
    } savings plan with the sum of ${dollar(
      amount
    )} your overall savings is now ${dollar(
      savings.saved
    )} out of a target of ${dollar(savings.target)}. ${
      savings.target >= savings.saved
        ? "can't wait for you to reach your target"
        : "Congrats on reaching your target.."
    }`;

    sendMail(
      `${req.user.email}`,
      messageSubject,
      messageSubject,
      messageContent,
      "Goto Website",
      `${dataFile.url}`
    );

    await transaction.save();

    const subject = messageSubject;
    const message = messageContent;

    const notification = new Notification({
      type: "savings",
      subject,
      message,
      user: req.user._id,
      transaction: transaction._id,
    });

    await notification.save();

    req.flash("success", true);
    req.flash("message", "Amount added Successfully");

    res.redirect("/savings");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postCloseSavings = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);
      return res.redirect("/savings");
    }

    const savingsId = req.body.savingsId;

    const savings = await Savings.findById(savingsId);
    const saved = +savings.saved;

    const userId = req.user._id;
    const user = await User.findById(userId);
    user.balance += saved;

    await Savings.findByIdAndRemove(savingsId);
    await user.save();

    const transaction = new Transaction({
      status: "complete",
      name: savings.title,
      type: "closed savings",
      saved: savings.saved,
      target: savings.target,
      profile: "close-saving.png",
      move: "credit",
      amount: saved,
      user: req.user._id,
    });

    const messageSubject = "Savings plan Closed";
    const messageContent = `Your ${savings.title} savings plan has been closed successfully, we hope you join in again.
  }`;

    sendMail(
      `${req.user.email}`,
      messageSubject,
      messageSubject,
      messageContent,
      "Goto Website",
      `${dataFile.url}`
    );

    await transaction.save();

    const subject = messageSubject;
    const message = messageContent;

    const notification = new Notification({
      type: "closed savings",
      subject,
      message,
      user: req.user._id,
      transaction: transaction._id,
    });

    await notification.save();

    req.flash("success", true);
    req.flash("message", "Your savings as been credited to your account");

    res.redirect("/savings");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
