const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const beneficiarySchema = new Schema(
  {
    accountMode: {
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
    accountNumber: String,
    bank: String,
    routing: String,
    paypalEmail: String,
    cashAppUsername: String,
    coin: String,
    wallet: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Beneficiary", beneficiarySchema);
