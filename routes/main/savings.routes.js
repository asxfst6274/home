const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const mainController = require("../../controllers/main/savings.controller");
const { isUser, user } = require("../../middleware/auth");
const {
  checkComparism,
  checkString,
  checkNumeric,
  checkNumericZero,
  checkOwnerId,
} = require("../../middleware/validations");
const Savings = require("../../models/savings");

const checkSavingsId = (para) => {
  return checkOwnerId(para, Savings);
};

router.get("/savings", isUser, mainController.getSavings);

router.post(
  "/savings",
  isUser,
  [
    checkComparism(body("category", "Category not allowed"), [
      "business",
      "gaming",
      "rent",
      "bills",
      "shopping",
      "sports",
      "movies",
      "vacation",
      "others",
    ]),
    checkString(body("title", "Invalid Title")).isLength({ max: 50 }).escape(),
    checkNumericZero(body("target", "Invalid target amount value")),
  ],
  mainController.postSavings
);

router.get("/add-savings", isUser, mainController.getAddSavings);

router.post(
  "/savings/add-money",
  isUser,
  [
    checkSavingsId(body("savingsId")),
    checkNumericZero(body("amount", "Please add a valid amount")).custom(
      (value, { req }) => {
        const user = req.user;
        if (user.balance < +value) throw new Error("Insufficient balance");
        return true;
      }
    ),
  ],
  mainController.postAddMoney
);

router.post(
  "/savings/close",
  isUser,
  [checkSavingsId(body("savingsId"))],
  mainController.postCloseSavings
);

module.exports = router;
