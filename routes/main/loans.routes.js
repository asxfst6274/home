const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const mainController = require("../../controllers/main/loans.controller");
const { isUser, user } = require("../../middleware/auth");
const {
  checkComparism,
  checkString,
  checkNumeric,
  checkNumericZero,
  checkOwnerId,
} = require("../../middleware/validations");
const Loans = require("../../models/loans");

const checkLoansId = (para) => {
  return checkOwnerId(para, Loans);
};

router.get("/loans", isUser, mainController.getLoans);

router.post(
  "/loans",
  isUser,
  [
    checkString(body("title", "Invalid Title")).isLength({ max: 50 }).escape(),
    checkNumericZero(body("amount", "Invalid amount value")),
  ],
  mainController.postLoans
);

router.get("/request-loan", isUser, mainController.getAddLoans);

router.post(
  "/loans/add-money",
  isUser,
  [
    checkLoansId(body("loansId")),
    checkNumericZero(body("paid", "Please add a valid amount")).custom(
      (value, { req }) => {
        const user = req.user;
        if (user.balance < +value) throw new Error("Insufficient balance");
        return true;
      }
    ),
  ],
  mainController.postAddMoney
);

module.exports = router;
