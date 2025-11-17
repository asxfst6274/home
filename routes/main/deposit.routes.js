const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const mainController = require("../../controllers/main/deposit.controllers");
const { isUser } = require("../../middleware/auth");
const {
  checkUserId,
  checkMethodId,
  checkNumeric,
  checkCryptoId,
  checkNumericZero,
} = require("../../middleware/validations");

router.get("/deposit", isUser, mainController.getDeposit);

router.post(
  "/deposit",
  isUser,
  [checkCryptoId(body("coinId")), checkNumericZero(body("amount"))],
  mainController.postDeposit
);

module.exports = router;
