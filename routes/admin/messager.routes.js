const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const adminController = require("../../controllers/admin/messager.controllers");
const { isAdmin, admin } = require("../../middleware/auth");
const { checkUserId } = require("../../middleware/validations");

router.get("/messager", admin(adminController.getMessager));
router.post(
  "/api/send-message",
  [checkUserId(body("userId")), body("message").not().isEmpty()],
  adminController.apiPostSendMessage
);

router.get("/chat/:userId", isAdmin, adminController.getChat);

module.exports = router;
