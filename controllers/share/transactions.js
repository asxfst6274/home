const dataFile = require("../../dataFile");
const User = require("../../models/user");
const Transaction = require("../../models/transaction");
const Notification = require("../../models/notification");
const Beneficiary = require("../../models/beneficiary");
const copyFile = require("../../util/copyFile");
const { dollar, toTitle } = require("../../helpers");
const sendMail = require("../../util/sendMail");

exports.senderTransaction = async (sender, transfer) => {
  try {
    let transaction;
    let profile;

    const beneficiary = await Beneficiary.findOne({
      user: sender._id,
      name: transfer.name,
    }).or([
      { accountNumber: transfer.accountNumber, accountMode: "same" },
      {
        accountNumber: transfer.accountNumber,
        routing: transfer.routing,
        bank: transfer.bank,
        accountMode: "others",
      },
      { paypalEmail: transfer.paypalEmail, accountMode: "paypal" },
      { cashAppUsername: transfer.cashAppUsername, accountMode: "cashApp" },
      { wallet: transfer.wallet, accountMode: "crypto" },
    ]);

    if (beneficiary && beneficiary.profile) {
      profile = copyFile("beneficiary", "transaction", beneficiary.profile, [
        "profile",
        "icon",
      ]);
    }

    switch (transfer.accountMode) {
      case "same":
        if (!profile) {
          const user = await User.findOne({ accountNumber });

          if (user && user.profile) {
            profile = copyFile("user", "transaction", user.profile, [
              "profile",
              "icon",
            ]);
          }
        }
        transaction = new Transaction({
          status: "ongoing",
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          accountNumber: transfer.accountNumber,
          bank: transfer.bank,
          user: sender._id,
          profile: transfer.profile,
          move: "debit",
        });
        break;
      case "others":
        transaction = new Transaction({
          status: "ongoing",
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          accountNumber: transfer.accountNumber,
          bank: transfer.bank,
          user: sender._id,
          profile: transfer.profile,
          routing: transfer.routing,
          move: "debit",
        });
        break;
      case "crypto":
        transaction = new Transaction({
          status: "ongoing",
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          coin: transfer.coin,
          wallet: transfer.wallet,
          user: sender._id,
          profile: transfer.profile,
          move: "debit",
        });
        break;
      case "paypal":
        transaction = new Transaction({
          status: "ongoing",
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          paypalEmail: transfer.paypalEmail,
          user: sender._id,
          profile: transfer.profile,
          move: "debit",
        });
        break;
      case "cashApp":
        transaction = new Transaction({
          status: "ongoing",
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          cashAppUsername: transfer.cashAppUsername,
          user: sender._id,
          profile: transfer.profile,
          move: "debit",
        });
        break;
    }

    return transaction;
  } catch (err) {
    console.log(err);
  }
};

exports.fundReceiver = async (transaction) => {
  try {
    const sender = await User.findById(transaction.user);
    const receiver = await User.findOne({
      accountNumber: transaction.accountNumber,
    });
    // UPDATE receiver
    receiver.balance += +transaction.amount;
    receiver.save();

    let receiverProfile;

    const receiverBeneficiary = await Beneficiary.findOne({
      user: receiver._id,
      accountNumber: sender.accountNumber,
    });

    if (receiverBeneficiary && receiverBeneficiary.profile) {
      receiverProfile = copyFile(
        "beneficiary",
        "transaction",
        receiverBeneficiary.profile,
        ["profile", "icon"]
      );
    } else if (sender.profile) {
      receiverProfile = copyFile("user", "transaction", sender.profile, [
        "profile",
        "icon",
      ]);
    }

    const receiverTransaction = new Transaction({
      status: "complete",
      type: "transfer",
      amount: transaction.amount,
      accountMode: transaction.accountMode,
      name: sender.name,
      user: receiver._id,
      profile: receiverProfile,
      move: "credit",
      from: transaction._id,
    });

    receiverTransaction.save();

    const messageSubject = "You've Got Money";
    const messageContent = `${toTitle(
      sender.name
    )} just sent the sum of ${dollar(transaction.amount)} to your ${
      receiver.accountNumber
    } account.`;

    sendMail(
      `${receiver.email}`,
      messageSubject,
      messageSubject,
      messageContent,
      "Goto Website",
      `${dataFile.url}`
    );

    const subject = "Money Recieved";
    const message = messageContent;

    const notification = new Notification({
      status: "complete",
      type: "transfer",
      subject,
      message,
      user: receiver._id,
      transaction: receiverTransaction._id,
    });

    notification.save();
  } catch (err) {
    console.log(err);
  }
};
