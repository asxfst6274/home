const express = require("express");
const { body, param } = require("express-validator");

const router = express.Router();

const adminController = require("../../controllers/admin/users.controllers");
const { isAdmin, admin } = require("../../middleware/auth");
const {
  checkString,
  checkNumeric,
  checkName,
  checkRegisterEmail,
  checkRegisterUsername,
  checkPassword,
  confirmPassword,
  checkComparism,
  checkId,
} = require("../../middleware/validations");
const User = require("../../models/user");

const checkUserId = (para, message = "User does not exist") => {
  return checkId(para, User, message);
};

router.get("/users", isAdmin, adminController.getUsers);

router.post(
  "/user/approve",
  isAdmin,
  [checkUserId(body("userId"))],
  adminController.postActionUser("approve")
);

router.post(
  "/user/block",
  isAdmin,
  [checkUserId(body("userId"))],
  adminController.postActionUser("block")
);

router.post(
  "/user/unblock",
  isAdmin,
  [checkUserId(body("userId"))],
  adminController.postActionUser("unblock")
);

router.post(
  "/user/delete",
  isAdmin,
  [checkUserId(body("userId"))],
  adminController.postActionUser("delete")
);

router.post(
  "/user/add-funds",
  isAdmin,
  [checkUserId(body("userId")), checkNumeric(body("amount"))],
  adminController.postAddFunds
);

router.post(
  "/user/cot",
  isAdmin,
  [checkUserId(body("_id"))],
  adminController.postUser("cot", "/users", "user token of transfer edited")
);

module.exports = router;
