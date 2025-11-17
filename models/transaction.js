const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const dataFile = require("../dataFile");
const copyFile = require("../util/copyFile");
const { dollar, toTitle } = require("../helpers");
const sendMail = require("../util/sendMail");

const transactionSchema = new Schema(
  {
    status: {
      type: String,
      default: "ongoing",
    },
    type: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    amount: {
      type: Number,
      required: true,
    },
    paid: {
      type: Number,
      default: 0,
    },
    interest: {
      type: Number,
      default: 0,
    },
    profile: {
      type: String,
    },
    move: {
      type: String,
      required: true,
    },
    category: String,
    color: String,
    target: String,
    saved: String,
    accountMode: String,
    accountNumber: String,
    bank: String,
    routing: String,
    paypalEmail: String,
    skrillEmailOrPhone: String,
    cashAppUsername: String,
    coin: String,
    network: String,
    wallet: String,
    created_at: { type: Date, required: true, default: new Date() },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

transactionSchema.methods.fundReceiver = async function () {
  try {
    const sender = await this.model("User").findById(this.user);
    const receiver = await this.model("User").findOne({
      accountNumber: this.accountNumber,
    });
    // UPDATE receiver
    receiver.balance += +this.amount;
    receiver.save();

    let receiverProfile;

    const receiverBeneficiary = await this.model("Beneficiary").findOne({
      user: receiver._id,
      accountNumber: sender.accountNumber,
    });

    if (receiverBeneficiary && receiverBeneficiary.profile) {
      // receiverProfile = copyFile(
      //   "beneficiary",
      //   "transaction",
      //   receiverBeneficiary.profile,
      //   ["profile", "icon"]
      // );

      receiverProfile = receiverBeneficiary.profile;
    } else if (sender.profile) {
      // receiverProfile = copyFile("user", "transaction", sender.profile, [
      //   "profile",
      //   "icon",
      // ]);

      receiverProfile = sender.profile;
    }

    const receiverTransaction = await this.model("Transaction").create({
      status: "complete",
      type: "transfer",
      amount: this.amount,
      accountMode: this.accountMode,
      name: sender.name,
      user: receiver._id,
      profile: receiverProfile,
      move: "credit",
      from: this._id,
    });

    const messageSubject = "You've Got Money";
    const messageContent = `${toTitle(
      sender.name
    )} just sent the sum of ${dollar(this.amount)} to your ${
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

    const subject = "Money Received";
    const message = messageContent;

    await this.model("Notification").create({
      status: "complete",
      type: "transfer",
      subject,
      message,
      user: receiver._id,
      transaction: receiverTransaction._id,
    });
  } catch (err) {
    console.log(err);
  }
};

transactionSchema.methods.fundDepositor = async function () {
  try {
    const depositor = await this.model("User").findById(this.user);
    // UPDATE DEPOSITOR
    depositor.balance += +this.amount;
    await depositor.save();

    const messageSubject = "Your deposit has been confirmed";
    const messageContent = `Your ${this.coin} deposit of ${dollar(
      this.amount
    )} has been confirmed and now credited to your account`;

    sendMail(
      `${depositor.email}`,
      messageSubject,
      messageSubject,
      messageContent,
      "Goto Website",
      `${dataFile.url}`
    );

    const subject = "Deposit Confirmed";
    const message = messageContent;

    await this.model("Notification").create({
      status: "complete",
      type: "deposit",
      subject,
      message,
      user: depositor._id,
      transaction: this._id,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("Transaction", transactionSchema);
