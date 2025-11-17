const express = require("express");
const { oneOf, body, param } = require("express-validator");
const { default: mongoose } = require("mongoose");

const router = express.Router();

const mainController = require("../../controllers/main/transfer.controller");
const { getApiCheck } = require("../../middleware/helpers");
const dataFile = require("../../dataFile");
const { isUser, user } = require("../../middleware/auth");
const {
  checkNumeric,
  checkComparism,
  checkName,
  checkString,
  checkEmail,
} = require("../../middleware/validations");
const User = require("../../models/user");
const Settings = require("../../models/settings");

const checkCot = (para) => {
  return para.custom(async (value, { req }) => {
    const requireCot = (await Settings.findOne()).cot;
    if (!requireCot) return true;
    if (!req.user.cotCode) throw new Error("Invalid Code");

    if (value != req.user.cotCode) throw new Error("Invalid Code");

    return true;
  });
};

router.get("/transfer", isUser, mainController.getTransfer);

router.get("/api/transfer/user/:accountNumber", isUser, mainController.getUser);

router.get(
  "/api/transfer/cot/:cot",
  isUser,
  [checkCot(param("cot"))],
  getApiCheck
);

router.post(
  "/transfer",
  isUser,
  [
    body().custom((_, { req }) => {
      if (req.user.status !== "active")
        throw new Error("Verification required");
      return true;
    }),
    checkCot(body("cotCode")),
    checkComparism(body("accountMode", "Something went wrong. try again"), [
      "same",
      "others",
      "crypto",
      "paypal",
      "cashApp",
    ]),
    checkName(body("name", "Name not allowed")),
    checkNumeric(body("amount")).custom(async (value, { req }) => {
      if (value <= 0) throw new Error("Invalid amount");
      if (value > req.user.balance) throw new Error("Insufficient balance");
    }),
    oneOf(
      [
        [
          // same
          checkNumeric(body("accountNumber"))
            .isLength({ min: 6, max: 22 })
            .custom(async (value, { req }) => {
              const user = await User.findOne({ accountNumber: value });

              if (!user)
                return Promise.reject(`User not available on ${dataFile.name}`);

              req.body.bank = dataFile.name;

              return true;
            }),
        ],
        [
          // others
          checkString(body("bank")),
          checkString(body("routing")),
          checkNumeric(body("accountNumber")).isLength({ min: 6, max: 22 }),
        ],
        [
          // paypal
          checkEmail(body("paypalEmail", "Invalid email address")),
        ],
        [
          // cashapp
          checkString(body("cashAppUsername", "Invalid username")),
        ],
        [
          // crypto
          checkString(body("coin")),
          checkString(body("wallet")),
        ],
      ],
      "Something went wrong, please check and try again"
    ),
  ],
  mainController.postTransfer
);

module.exports = router;
