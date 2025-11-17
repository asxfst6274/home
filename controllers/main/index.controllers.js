const dataFile = require("../../dataFile");
const Beneficiary = require("../../models/beneficiary");
const Savings = require("../../models/savings");
const Transaction = require("../../models/transaction");
const sendEmail = require("../../util/sendEmail");
const sendMail = require("../../util/sendMail");

exports.getIndex = async (req, res, next) => {
  const savings = await Savings.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(3);
  const beneficiaries = await Beneficiary.find({ user: req.user._id })
    .sort({ updatedAt: -1 })
    .limit(4);
  const transactions = await Transaction.find({ user: req.user._id })
    .sort({
      createdAt: -1,
    })
    .limit(3);

  // sendMail().catch(console.error);

  const savingsGroup = await Savings.aggregate([
    { $match: { user: req.user._id, status: "complete" } },
    { $group: { _id: "$user", total: { $sum: "$saved" } } },
  ]);

  const incomeGroup = await Transaction.aggregate([
    { $match: { user: req.user._id, status: "complete", move: "credit" } },
    { $group: { _id: "$user", total: { $sum: "$amount" } } },
  ]);

  const expenseGroup = await Transaction.aggregate([
    { $match: { user: req.user._id, status: "complete", move: "debit" } },
    { $group: { _id: "$user", total: { $sum: "$amount" } } },
  ]);

  const savingsCount = savingsGroup[0]?.total || 0;
  const incomeCount = incomeGroup[0]?.total || 0;
  const expenseCount = expenseGroup[0]?.total || 0;

  res.render("main/index", {
    title: "User Dashboard",
    savings,
    beneficiaries,
    transactions,
    savingsCount,
    incomeCount,
    expenseCount,
  });
};
