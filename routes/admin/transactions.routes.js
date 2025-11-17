const express = require("express");
const { body, param, oneOf } = require("express-validator");
const { default: mongoose } = require("mongoose");

const router = express.Router();

const adminController = require("../../controllers/admin/transactions.controllers");
const { admin, isAdmin } = require("../../middleware/auth");
const {
  checkNumeric,
  checkUserId,
  checkString,
  checkEmail,
  checkComparism,
} = require("../../middleware/validations");
const Transaction = require("../../models/transaction");

const checkTransactionId = (para, type, move) => {
  return para.custom(async (value, { req }) => {
    const transaction = !mongoose.Types.ObjectId.isValid(value)
      ? undefined
      : await Transaction.findOne({ _id: value, type, move });
    if (!transaction)
      return Promise.reject("Something went wrong, please try again later");
    return true;
  });
};

// /////////
// TRANSFER
// /////////////

router.get("/transfers", admin(adminController.getTransfer));

router.get("/transfer/add", isAdmin, admin(adminController.getAddTransfer));

router.get(
  "/transfer/edit/:transferId",
  isAdmin,
  checkTransactionId(param("transferId"), "transfer", "debit"),
  admin(adminController.getEditTransfer)
);

router.post(
  "/admin/transfer/add",
  isAdmin,
  [
    checkNumeric(body("amount")).custom(async (value, { req }) => {
      if (value <= 0) throw new Error("Invalid amount");
    }),
    body("created_at").custom((value, { req }) => {
      req.body.created_at = new Date(value || "");
      return true;
    }),
    checkComparism(body("status"), ["complete", "ongoing", "cancelled"]),
    oneOf([
      [
        // same
        checkUserId(body("user")),
        checkUserId(body("reciever")),
        body().custom((_, { req }) => {
          if (req.body.user === req.body.reciever)
            throw new Error("Sender and reciever can't be thesame");
          return true;
        }),
      ],
      [
        // others
        checkString(body("bank")),
        checkNumeric(body("routing")),
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
    ]),
  ],
  adminController.postTransfer
);

router.post(
  "/admin/transfer/edit",
  isAdmin,
  [
    checkNumeric(body("amount")).custom(async (value, { req }) => {
      if (value <= 0) throw new Error("Invalid amount");
    }),
    checkTransactionId(body("_id"), "transfer", "debit"),
    oneOf([
      [
        // same
        checkUserId(body("user")),
        checkUserId(body("reciever")),
        body().custom((_, { req }) => {
          if (req.body.user === req.body.reciever)
            throw new Error("Sender and reciever can't be thesame");
          return true;
        }),
      ],
      [
        // others
        checkString(body("bank")),
        checkNumeric(body("routing")),
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
    ]),
  ],
  adminController.postEditTransfer
);

router.post(
  "/transfer/delete",
  isAdmin,
  [checkTransactionId(body("transactionId"), "transfer", "debit")],
  adminController.postActionTransaction("delete")
);

router.post(
  "/transfer/approve",
  isAdmin,
  [checkTransactionId(body("transactionId"), "transfer", "debit")],
  adminController.postActionTransaction("complete")
);

router.post(
  "/transfer/cancel",
  isAdmin,
  [checkTransactionId(body("transactionId"), "transfer", "debit")],
  adminController.postActionTransaction("cancel")
);

// /////////
// DEPOSIT
// /////////////

router.get("/deposits", admin(adminController.getDeposit));

router.get("/deposit/add", isAdmin, admin(adminController.getAddDeposit));

router.get("/deposit/edit", isAdmin, admin(adminController.getEditDeposit));

router.post(
  "/deposit/delete",
  isAdmin,
  [checkTransactionId(body("transactionId"), "deposit", "credit")],
  adminController.postActionTransaction("delete")
);

router.post(
  "/deposit/approve",
  isAdmin,
  [checkTransactionId(body("transactionId"), "deposit", "credit")],
  adminController.postActionTransaction("complete")
);

router.post(
  "/deposit/cancel",
  isAdmin,
  [checkTransactionId(body("transactionId"), "deposit", "credit")],
  adminController.postActionTransaction("cancel")
);

module.exports = router;
