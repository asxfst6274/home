const { validationResult } = require("express-validator");
const Notification = require("../../models/notification");
const Crypto = require("../../models/crypto");
const Transaction = require("../../models/transaction");
const dataFile = require("../../dataFile");
const sendMail = require("../../util/sendMail");
const { dollar } = require("../../helpers");

exports.getDeposit = async (req, res, next) => {
  try {
    const cryptos = await Crypto.find();

    res.render("main/deposit", {
      title: "Deposit",
      cryptos,
      success: req.flash("success")[0],
      error: req.flash("error")[0],
      message: req.flash("message")[0],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postDeposit = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/deposit");
    }

    const userId = req.user._id;
    const amount = req.body.amount;

    const coinId = req.body.coinId;

    const crypto = await Crypto.findById(coinId);

    const name = crypto.coin;
    const wallet = crypto.wallet;

    const transaction = new Transaction({
      status: "ongoing",
      type: "deposit",
      name: name,
      coin: name,
      wallet: wallet,
      amount: amount,
      user: userId,
      move: "credit",
      created_at: new Date(),
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const messageSubject = "New Deposit";
      const messageContent = `${req.user.email} made a deposit of ${dollar(
        amount
      )}.`;

      sendMail(
        `${adminEmail}`,
        messageSubject,
        messageSubject,
        messageContent,
        "Goto Website",
        `${dataFile.url}`
      );
    }

    const messageSubject = `New Pending Deposit`;
    const messageContent = `Your ${name} deposit will be credited automatically to your account once it has been confirmed on the blockchain network. Thank you for choosing ${dataFile.name}...`;

    sendMail(
      `${req.user.email}`,
      messageSubject,
      messageSubject,
      messageContent,
      "View Details",
      `${dataFile.url}/transactions`
    );

    await transaction.save();

    const subject = "ongoing deposit";

    const message = messageContent;

    const notification = new Notification({
      user: userId,
      type: "deposit",
      subject,
      message,
      transaction: transaction._id,
    });

    await notification.save();

    // SEND EMAIL LOGIC

    req.flash("success", true);
    req.flash(
      "message",
      "Your deposit is on pending and your account will be credited automatically once it is confirmed on the blockchain network"
    );

    return res.redirect("/deposit");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
