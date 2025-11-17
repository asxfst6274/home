const Transaction = require("../../models/transaction");

exports.getTransactions = async (req, res, next) => {
  const transactions = await Transaction.find({ user: req.user._id }).sort({
    created_at: -1,
  });

  res.render("main/transactions", {
    title: "User Transactions",
    transactions,
  });
};
