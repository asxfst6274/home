const express = require("express");
const { body, oneOf } = require("express-validator");
const { default: mongoose } = require("mongoose");

const router = express.Router();

const mainController = require("../../controllers/main/beneficiaries.controllers");
const dataFile = require("../../dataFile");
const { isUser, user } = require("../../middleware/auth");
const { imageUploader, imageResizer } = require("../../middleware/imageUpload");
const {
  checkComparism,
  checkName,
  checkNumeric,
  checkString,
  checkEmail,
  checkOwnerId,
} = require("../../middleware/validations");
const accountNumber = require("../../models/accountNumber");
const Beneficiary = require("../../models/beneficiary");
const User = require("../../models/user");

const checkBeneficiaryId = (para) => {
  return checkOwnerId(para, Beneficiary);
};

const validatePostBeneficiary = [
  checkComparism(body("accountMode", "Something went wrong. try again"), [
    "same",
    "others",
    "crypto",
    "paypal",
    "cashApp",
  ]),
  checkName(body("name", "Name not allowed")),
  oneOf(
    [
      [
        // same
        checkNumeric(body("accountNumber"))
          .isLength({ min: 6, max: 22 })
          .custom(async (value, { req }) => {
            const userId = req.user._id;
            const benId = req.body.id;

            console.log(mongoose.Types.ObjectId.isValid(benId));

            const beneficiary = !mongoose.Types.ObjectId.isValid(benId)
              ? await Beneficiary.findOne({
                  user: userId,
                  accountNumber: value,
                })
              : await Beneficiary.findOne({
                  user: userId,
                  accountNumber: value,
                  _id: { $ne: benId },
                });

            if (beneficiary) return Promise.reject("Beneficiary already exist");

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
        checkNumeric(body("routing")),
        checkNumeric(body("accountNumber"))
          .isLength({ min: 6, max: 22 })
          .custom(async (value, { req }) => {
            const userId = req.user._id;
            const benId = req.body.id;

            const beneficiary = !mongoose.Types.ObjectId.isValid(benId)
              ? await Beneficiary.findOne({
                  user: userId,
                  accountNumber: value,
                })
              : await Beneficiary.findOne({
                  user: userId,
                  accountNumber: value,
                  _id: { $ne: benId },
                });

            if (beneficiary) return Promise.reject("Beneficiary already exist");
          }),
      ],
      [
        // paypal
        checkEmail(body("paypalEmail", "Invalid email address")).custom(
          async (value, { req }) => {
            const userId = req.user._id;
            const benId = req.body.id;

            const beneficiary = !mongoose.Types.ObjectId.isValid(benId)
              ? await Beneficiary.findOne({
                  user: userId,
                  wallet: value,
                })
              : await Beneficiary.findOne({
                  user: userId,
                  paypalEmail: value,
                  _id: { $ne: benId },
                });

            if (beneficiary) return Promise.reject("Beneficiary already exist");
          }
        ),
      ],
      [
        // cashapp
        checkString(body("cashAppUsername", "Invalid username")).custom(
          async (value, { req }) => {
            const userId = req.user._id;
            const benId = req.body.id;

            const beneficiary = !mongoose.Types.ObjectId.isValid(benId)
              ? await Beneficiary.findOne({
                  user: userId,
                  cashAppUsername: value,
                })
              : await Beneficiary.findOne({
                  user: userId,
                  cashAppUsername: value,
                  _id: { $ne: benId },
                });

            if (beneficiary) return Promise.reject("Beneficiary already exist");
          }
        ),
      ],
      [
        // crypto
        checkString(body("coin")),
        checkString(body("wallet")).custom(async (value, { req }) => {
          const userId = req.user._id;
          const benId = req.body.id;

          const beneficiary = !mongoose.Types.ObjectId.isValid(benId)
            ? await Beneficiary.findOne({
                user: userId,
                wallet: value,
              })
            : await Beneficiary.findOne({
                user: userId,
                wallet: value,
                _id: { $ne: benId },
              });

          if (beneficiary) return Promise.reject("Beneficiary already exist");
        }),
      ],
    ],
    "Something went wrong, please check and try again"
  ),
];

router.get("/beneficiaries", isUser, mainController.getBeneficiaries);

router.get("/add-beneficiary", mainController.getAddBeneficiary);

router.get(
  "/edit-beneficiary/:beneficiaryId",
  mainController.getEditBeneficiary
);

router.post(
  "/api/beneficiary/account-number",
  isUser,
  mainController.postCheckAccountNumber
);

router.post(
  "/api/beneficiary/paypal-email",
  isUser,
  mainController.postCheckPaypalEmail
);

router.post(
  "/api/beneficiary/cash-app-username",
  isUser,
  mainController.postCheckCashAppUsername
);

router.post("/api/beneficiary/wallet", isUser, mainController.postCheckWallet);

router.get(
  "/api/beneficiary/user/:accountNumber",
  isUser,
  mainController.getUser
);

router.post(
  "/beneficiary/create",
  isUser,
  imageUploader,
  validatePostBeneficiary,
  imageResizer("beneficiary", ["profile", "icon"], true),
  mainController.postBeneficiary
);

router.post(
  "/beneficiary/edit",
  isUser,
  imageUploader,
  [
    checkBeneficiaryId(body("id", "Something went wrong. try again")),
    ...validatePostBeneficiary,
  ],
  imageResizer("beneficiary", ["profile", "icon"], true),
  mainController.postEditBeneficiary
);

router.post(
  "/beneficiary/delete",
  isUser,
  [
    checkBeneficiaryId(
      body("beneficiaryId", "Something went wrong. Please try again later")
    ),
  ],
  mainController.postDeleteBeneficiary
);

router.post(
  "/beneficiary/transfer",
  isUser,
  [
    checkBeneficiaryId(
      body("beneficiaryId"),
      "something went wrong, we could not get your beneficiary"
    ),
  ],
  mainController.postTransferToBeneficiary
);

module.exports = router;
