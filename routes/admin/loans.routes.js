const express = require("express");
const { body } = require("express-validator");
const { default: mongoose } = require("mongoose");

const router = express.Router();

const adminController = require("../../controllers/admin/loans.controllers");
const { admin, isAdmin } = require("../../middleware/auth");
const Loan = require("../../models/loans");

const checkLoanId = (para, type, move) => {
  return para.custom(async (value, { req }) => {
    const loan = !mongoose.Types.ObjectId.isValid(value)
      ? undefined
      : await Loan.findOne({ _id: value, type, move });
    if (!loan)
      return Promise.reject("Something went wrong, please try again later");
    return true;
  });
};

// /////////
// LOAN
// /////////////

router.get("/users-loans", admin(adminController.getLoan));

router.post(
  "/loan/delete",
  isAdmin,
  [checkLoanId(body("loanId"), "loan", "credit")],
  adminController.postActionLoan("delete")
);

router.post(
  "/loan/approve",
  isAdmin,
  [checkLoanId(body("loanId"), "loan", "credit")],
  adminController.postActionLoan("approved")
);

router.post(
  "/loan/cancel",
  isAdmin,
  [checkLoanId(body("loanId"), "loan", "credit")],
  adminController.postActionLoan("denied")
);

module.exports = router;
