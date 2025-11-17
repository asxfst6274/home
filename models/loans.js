const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loansSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paid: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "pending",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approved: {
      type: Date,
    },
  },
  { timestamps: true }
);

loansSchema.methods.fund = async function () {
  try {
    const user = await this.model("User").findById(this.user);

    user.balance += +this.amount;
    await user.save();

    const messageSubject = "Your loan has been approved";
    const messageContent = `Your ${this.title} loan of ${dollar(
      this.amount
    )} has been approved and now credited to your account`;

    sendMail(
      `${user.email}`,
      messageSubject,
      messageSubject,
      messageContent,
      "Goto Website",
      `${dataFile.url}`
    );

    const subject = "Loan Approved";
    const message = messageContent;

    this.model("Notification").create({
      status: "complete",
      type: "loan",
      subject,
      message,
      user: user._id,
      transaction: this._id,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("Loans", loansSchema);
