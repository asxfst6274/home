const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  liveChat: {
    type: Boolean,
    required: true,
    default: true,
  },
  cot: {
    type: Boolean,
    required: true,
    default: true,
  },
  pendNewUsers: {
    type: Boolean,
    required: true,
    default: true,
  },
  email: String,
  minAge: Number,
});

module.exports = mongoose.model("Settings", settingsSchema);
