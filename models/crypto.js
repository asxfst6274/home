const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cryptoSchema = new Schema(
  {
    coin: {
      type: String,
      required: true,
    },
    wallet: {
      type: String,
      required: true,
    },
    network: {
      type: String,
    },
    status: {
      type: String,
      default: "enabled",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crypto", cryptoSchema);
