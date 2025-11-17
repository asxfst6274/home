const { validationResult } = require("express-validator");
const dataFile = require("../../dataFile");
const { dollar, getLoanInterest } = require("../../helpers");
const Notification = require("../../models/notification");
const Loans = require("../../models/loans");
const Transaction = require("../../models/transaction");
const User = require("../../models/user");
const sendEmail = require("../../util/sendEmail");
const sendMail = require("../../util/sendMail");

exports.getLoans = async (req, res, next) => {
  try {
    const loans = await Loans.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.render("main/loans", {
      title: "User Profile",
      loans,
      error: req.flash("error")[0],
      success: req.flash("success")[0],
      message: req.flash("message")[0],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postLoans = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    const title = req.body.title;
    const amount = req.body.amount;

    if (!errors.isEmpty()) {
      req.flash("loans-title", title);
      req.flash("loans-amount", amount);
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/request-loan");
    }

    const loans = new Loans({
      title,
      amount,
      user: req.user._id,
    });

    await loans.save();

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const messageSubject = "New Loan Request";
      const messageContent = `${
        req.user.email
      } just requested a loan of ${dollar(amount)}.`;

      sendMail(
        `${adminEmail}`,
        messageSubject,
        messageSubject,
        messageContent,
        "Goto Website",
        `${dataFile.url}`
      );
    }

    const subject = "loan application";
    const message = `Your new loan application for ${loans.title} is under review.`;

    const notification = new Notification({
      type: "loan-application",
      subject,
      message,
      user: req.user._id,
    });

    await notification.save();

    req.flash("success", true);
    req.flash("message", "Loan request sent successfully");

    res.redirect("/loans");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAddLoans = (req, res, next) => {
  res.render("main/request-loan", {
    title: "User Profile",
    inputTitle: req.flash("loans-title")[0],
    amount: req.flash("loans-amount")[0],
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
      return res.redirect("/loans");
    }

    const loansId = req.body.loansId;
    const loans = await Loans.findById(loansId);

    const amount = loans.amount;
    const interest = getLoanInterest(
      loans.amount,
      loans.approved || new Date()
    );
    let amountLeft = amount + interest - loans.paid;

    const paid = amountLeft > +req.body.paid ? +req.body.paid : amountLeft;

    loans.paid += paid;
    amountLeft = amount + interest - loans.paid;

    const userId = req.user._id;
    const user = await User.findById(userId);
    user.balance -= paid;

    if (amountLeft <= 0) {
      loans.status = "settled";
    }

    await user.save();
    await loans.save();

    const transaction = new Transaction({
      status: "re-payment",
      type: "loans",
      name: loans.title,
      amount: paid,
      paid: loans.paid,
      interest,
      user: req.user._id,
      profile: "loan.png",
      move: "debit",
    });

    const messageSubject = `Loan Re-payment`;
    const messageContent = `You re-paid your ${
      loans.title
    } loan plan with the sum of ${dollar(
      paid
    )} your overall re-payment is now ${dollar(
      loans.paid
    )} out of a total plus interest of ${dollar(amount + interest)}. ${
      amount + interest >= loans.paid
        ? `you still have a total of ${dollar(amountLeft)} to be paid`
        : "Congrats on settling your loans"
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
      type: "loans",
      subject,
      message,
      user: req.user._id,
      transaction: transaction._id,
    });

    await notification.save();

    req.flash("success", true);
    req.flash("message", "Amount Re-Paid Successfully");

    res.redirect("/loans");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
