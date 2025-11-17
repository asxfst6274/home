const Transaction = require("../../models/transaction");
const User = require("../../models/user");

exports.getIndex = async (req, res, next) => {
  const userCount = await User.find().countDocuments();
  const transferCount = await Transaction.find({
    type: "transfer",
    status: "ongoing",
  }).countDocuments();
  const depositCount = await Transaction.find({
    type: "deposit",
    status: "ongoing",
  }).countDocuments();
  res.render("admin/index", {
    userCount,
    transferCount,
    depositCount,
    breadcrumb1: [],
    breadcrumb2: [],
  });
};
