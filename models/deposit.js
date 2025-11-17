const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const depositSchema = new Schema(
  {
    method: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    wallet: {
      type: String,
      required: true,
    },
    network: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deposit", depositSchema);
