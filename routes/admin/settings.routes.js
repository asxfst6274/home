const express = require("express");

const router = express.Router();

const adminContoller = require("../../controllers/admin/settings.controllers");
const { isAdmin, admin } = require("../../middleware/auth");
const { body, param, oneOf } = require("express-validator");
const {
  checkNumeric,
  checkMethodId,
  checkEmail,
  checkNumericZero,
} = require("../../middleware/validations");

router.get("/settings", admin(adminContoller.getSettings));

router.post(
  "/settings",
  isAdmin,
  [
    oneOf([
      checkEmail(body("email"), "Invalid email address"),
      body("email").isEmpty(),
    ]),
    checkNumericZero(body("minAge")),
    body().custom((_, { req }) => {
      req.body.cot = !!req.body.cot;
      req.body.liveChat = !!req.body.liveChat;
      req.body.pendNewUsers = !!req.body.pendNewUsers;
      return true;
    }),
  ],
  adminContoller.postSettings("", "/settings", "Fields updated successfully")
);

module.exports = router;
