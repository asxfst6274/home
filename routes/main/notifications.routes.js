const express = require("express");
const { param, body } = require("express-validator");

const router = express.Router();

const mainController = require("../../controllers/main/notifications.controllers");
const { isUser, user } = require("../../middleware/auth");
const { checkOwnerId } = require("../../middleware/validations");
const Notification = require("../../models/notification");

const noticeId = (para) => {
  return checkOwnerId(para, Notification);
};

router.get("/notifications", user(mainController.getNotifications));

router.get(
  "/api/notification/read/:noticeId",
  isUser,
  [noticeId(param("noticeId"))],
  mainController.getReadNotification
);

router.post(
  "/notification/delete",
  isUser,
  [noticeId(body("noticeId"))],
  mainController.postDeleteNotification
);

module.exports = router;
