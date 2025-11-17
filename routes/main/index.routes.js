const express = require("express");

const router = express.Router();

const mainController = require("../../controllers/main/index.controllers");
const { isUser, user } = require("../../middleware/auth");

router.get("/", user(mainController.getIndex));

module.exports = router;
