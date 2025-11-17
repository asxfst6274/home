const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const copyFile = require("../util/copyFile");
const dataFile = require("../dataFile");
const sendMail = require("../util/sendMail");
const { dollar, toTitle } = require("../helpers");
const deleteFile = require("../util/deleteFile");

const privilages = {
  read: {
    type: Boolean,
    default: false,
  },
  create: {
    type: Boolean,
    default: false,
  },
  update: {
    type: Boolean,
    default: false,
  },
  delete: {
    type: Boolean,
    default: false,
  },
};

const userSchema = new Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },
    accountType: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    phoneCountryCode: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    privilage: {
      user: privilages,
      plan: privilages,
      investment: privilages,
      admin: {
        type: Boolean,
        default: false,
      },
    },
    balance: {
      type: Number,
      default: 0,
    },
    hideBalance: {
      type: Boolean,
      default: false,
    },
    cotCode: String,
    resetToken: String,
    resetTokenExpiration: Date,
  },
  { timestamps: true }
);

userSchema.methods.setPassword = async function (password) {
  try {
    const id = this._id;
    const newPass = id + password;
    const hashPass = await bcrypt.hash(newPass, 12);
    this.password = hashPass;
    return this.save();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

userSchema.methods.verifyPassword = async function (password) {
  try {
    const inputPassword = this._id + password;
    return await bcrypt.compare(inputPassword, this.password);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

userSchema.methods.addFunds = function (account, amount) {
  if (account === "main") {
    const oldBalnace = this.balance;
    const newBalance = oldBalnace + +amount;
    this.balance = newBalance;
    return this.save();
  } else if (account === "bonus") {
    const oldBalnace = this.bonus;
    const newBalance = oldBalnace + +amount;
    this.bonus = newBalance;
    return this.save();
  }
};

userSchema.statics.transfer = async function (transfer) {
  try {
    const sender = await this.findById(transfer.user);
    let transaction;
    let profile;
    if (!transfer.created_at) transfer.created_at = new Date();
    const beneficiary = await this.model("Beneficiary")
      .findOne({
        user: transfer.user,
        name: transfer.name,
      })
      .or([
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
      // profile = copyFile("beneficiary", "transaction", beneficiary.profile, [
      //   "profile",
      //   "icon",
      // ]);
      profile = beneficiary.profile;
    }

    switch (transfer.accountMode) {
      case "same":
        if (!profile) {
          const user = await this.model("User").findOne({
            accountNumber: transfer.accountNumber,
          });

          if (user && user.profile) {
            // profile = copyFile("user", "transaction", user.profile, [
            //   "profile",
            //   "icon",
            // ]);
            profile = user.profile;
          }
        }
        transaction = await this.model("Transaction").create({
          status: `${transfer.status ? transfer.status : "ongoing"}`,
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          accountNumber: transfer.accountNumber,
          bank: dataFile.name,
          user: transfer.user,
          profile: profile,
          move: "debit",
          created_at: transfer.created_at,
        });
        break;
      case "others":
        transaction = await this.model("Transaction").create({
          status: `${transfer.status ? transfer.status : "ongoing"}`,
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          accountNumber: transfer.accountNumber,
          bank: transfer.bank,
          user: transfer.user,
          profile: profile,
          routing: transfer.routing,
          move: "debit",
          created_at: transfer.created_at,
        });
        break;
      case "crypto":
        transaction = await this.model("Transaction").create({
          status: `${transfer.status ? transfer.status : "ongoing"}`,
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          coin: transfer.coin,
          wallet: transfer.wallet,
          user: transfer.user,
          profile: profile,
          move: "debit",
          created_at: transfer.created_at,
        });
        break;
      case "paypal":
        transaction = await this.model("Transaction").create({
          status: `${transfer.status ? transfer.status : "ongoing"}`,
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          paypalEmail: transfer.paypalEmail,
          user: transfer.user,
          profile: profile,
          move: "debit",
          created_at: transfer.created_at,
        });
        break;
      case "cashApp":
        transaction = await this.model("Transaction").create({
          status: `${transfer.status ? transfer.status : "ongoing"}`,
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          cashAppUsername: transfer.cashAppUsername,
          user: transfer.user,
          profile: profile,
          move: "debit",
          created_at: transfer.created_at,
        });
        break;
    }

    if (transfer.status !== "cancelled") {
      sender.balance -= +transfer.amount;
      await sender.save();
    }

    if (transfer.status === "complete" && transfer.accountMode === "same") {
      transaction.fundReceiver();
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const messageSubject = "New Transfer";
      const messageContent = `${sender.email} made a transfer of ${dollar(
        transfer.amount
      )} to ${toTitle(transfer.name)}.`;

      sendMail(
        `${adminEmail}`,
        messageSubject,
        messageSubject,
        messageContent,
        "Goto Website",
        `${dataFile.url}`
      );
    }

    const messageSubject = "Money Sent Successfully";
    const messageContent = `Your transfer of ${dollar(
      transfer.amount
    )} has been sent successfully to ${toTitle(transfer.name)}.`;

    sendMail(
      `${sender.email}`,
      messageSubject,
      messageSubject,
      messageContent,
      "Goto Website",
      `${dataFile.url}`
    );

    const subject = "Money Sent";
    const message = messageContent;

    this.model("Notification").create({
      status: "complete",
      type: "transfer",
      subject,
      message,
      user: transfer.user,
      transaction: transaction._id,
    });
  } catch (err) {
    console.log(err);
  }
};

userSchema.statics.editTransfer = async function (transfer) {
  try {
    const transaction = await this.model("Transaction").findById(transfer._id);
    let profile;

    if (transaction.profile) deleteFile("transaction", transaction.profile);

    const beneficiary = await this.model("Beneficiary")
      .findOne({
        user: transfer.user,
        name: transfer.name,
      })
      .or([
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
      // profile = copyFile("beneficiary", "transaction", beneficiary.profile, [
      //   "profile",
      //   "icon",
      // ]);

      profile = beneficiary.profile;
    }

    switch (transfer.accountMode) {
      case "same":
        if (!profile) {
          const user = await this.model("User").findOne({
            accountNumber: transfer.accountNumber,
          });

          if (user && user.profile) {
            // profile = copyFile("user", "transaction", user.profile, [
            //   "profile",
            //   "icon",
            // ]);

            profile = user.profile;
          }
        }
        await transaction.updateOne({
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          accountNumber: transfer.accountNumber,
          bank: dataFile.name,
          user: transfer.user,
          profile: profile,
          routing: undefined,
          paypalEmail: undefined,
          cashAppUsername: undefined,
          coin: undefined,
          wallet: undefined,
          // move: "debit",
          created_at: new Date(transfer.created_at),
        });
        break;
      case "others":
        await transaction.updateOne({
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          accountNumber: transfer.accountNumber,
          bank: transfer.bank,
          user: transfer.user,
          profile: profile,
          routing: transfer.routing,
          paypalEmail: undefined,
          cashAppUsername: undefined,
          coin: undefined,
          wallet: undefined,
          // move: "debit",
          created_at: new Date(transfer.created_at),
        });
        break;
      case "crypto":
        await transaction.updateOne({
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          coin: transfer.coin,
          wallet: transfer.wallet,
          user: transfer.user,
          profile: profile,
          accountNumber: undefined,
          bank: undefined,
          routing: undefined,
          paypalEmail: undefined,
          cashAppUsername: undefined,
          // move: "debit",
          created_at: new Date(transfer.created_at),
        });
        break;
      case "paypal":
        await transaction.updateOne({
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          paypalEmail: transfer.paypalEmail,
          user: transfer.user,
          profile: profile,
          accountNumber: undefined,
          bank: undefined,
          routing: undefined,
          cashAppUsername: undefined,
          coin: undefined,
          wallet: undefined,
          // move: "debit",
          created_at: new Date(transfer.created_at),
        });
        break;
      case "cashApp":
        await transaction.updateOne({
          type: "transfer",
          amount: transfer.amount,
          accountMode: transfer.accountMode,
          name: transfer.name,
          cashAppUsername: transfer.cashAppUsername,
          user: transfer.user,
          profile: profile,
          accountNumber: undefined,
          bank: undefined,
          routing: undefined,
          paypalEmail: undefined,
          coin: undefined,
          wallet: undefined,
          // move: "debit",
          created_at: new Date(transfer.created_at),
        });
        break;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("User", userSchema);
