const express = require("express");
const { body, param } = require("express-validator");
const { default: mongoose } = require("mongoose");

const router = express.Router();

const mainController = require("../../controllers/main/cards.controller");
const { isUser, user } = require("../../middleware/auth");
const { addEditing } = require("../../middleware/helpers");
const {
  checkComparism,
  checkName,
  checkNumeric,
  checkNumericZero,
  checkOwnerId,
} = require("../../middleware/validations");
const Card = require("../../models/card");

const checkCardId = (para) => {
  return checkOwnerId(para, Card);
};

const checkCardNumber = (para) => {
  return checkNumeric(para)
    .isLength({ min: 12, max: 20 })
    .custom(async (value, { req }) => {
      const cardId = !req.myCustomEditing
        ? null
        : req.body.cardId
        ? req.body.cardId
        : req.params.cardId;
      const card = !mongoose.Types.ObjectId.isValid(cardId)
        ? await Card.findOne({ number: value, user: req.user._id })
        : await Card.findOne({
            number: value,
            user: req.user._id,
            _id: { $ne: cardId },
          });
      if (card) return Promise.reject("Card already exist");

      return true;
    });
};

const validatePostCard = [
  checkComparism(body("type", "Invalid card type"), ["mastercard", "visa"]),
  checkName(body("name", "Invalid Name")),
  checkCardNumber(body("number")),
  checkNumericZero(body("month", "Invalid Expiring date")).custom(
    (value, { req }) => {
      const month = value;
      const year = req.body.year;

      const thisMonth = 1 + +new Date().getMonth();
      const thisYear = +new Date().getFullYear().toString().slice(2);

      if (thisYear > year) return Promise.reject("Invalid Expiring date");

      if (thisYear === year && thisMonth > month)
        return Promise.reject("Invalid Expiring date");

      return true;
    }
  ),
  checkNumericZero(body("year", "Invalid Expiring date")),
  checkNumeric(body("cvv", "Invalid CVV")).isLength({ min: 3, max: 4 }),
];

router.get("/cards", user(mainController.getCards));

router.get("/add-card", isUser, mainController.getAddCard);

router.get(
  "/api/card/check-number/:number/:cardId",
  isUser,
  addEditing,
  [checkCardNumber(param("number"), checkCardId(param("cardId")))],
  mainController.getApiCheck
);

router.post("/card", isUser, validatePostCard, mainController.postCard);

router.get(
  "/edit-card/:cardId",
  isUser,
  [checkCardId(param("cardId"))],
  mainController.getEditCard
);

router.post(
  "/edit-card",
  isUser,
  addEditing,
  [checkCardId(body("cardId")), ...validatePostCard],
  mainController.postEditCard
);

router.post(
  "/card/delete",
  isUser,
  [checkCardId(body("cardId"))],
  mainController.postDeleteCard
);

module.exports = router;
