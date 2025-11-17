const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const savingsSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
    saved: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Savings", savingsSchema);
