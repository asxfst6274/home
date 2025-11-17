const express = require("express");

const router = express.Router();

const mainController = require("../../controllers/main/transactions.controllers");
const { isUser, user } = require("../../middleware/auth");

router.get("/transactions", user(mainController.getTransactions));

module.exports = router;
