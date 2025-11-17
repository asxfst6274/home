const express = require("express");

const router = express.Router();

const mainController = require("../../controllers/main/settings.controllers");
const { isUser, user } = require("../../middleware/auth");

router.get("/settings", user(mainController.getSettings));

module.exports = router;
