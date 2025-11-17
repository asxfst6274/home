const express = require("express");

const router = express.Router();

const mainController = require("../../controllers/main/bills.controller");
const { isUser, user } = require("../../middleware/auth");

// router.get("/bills", isUser, mainController.getBills);

module.exports = router;
