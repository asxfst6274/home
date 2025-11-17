const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountNumberSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
});

accountNumberSchema.methods.newNumber = async function () {
  const oldNumber = this.number;
  const add = 1 + Math.trunc(Math.random() * 27);
  const newNumber = oldNumber + add;
  this.number = newNumber;
  await this.save();
  return newNumber;
};

module.exports = mongoose.model("AccountNumber", accountNumberSchema);
