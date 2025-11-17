const express = require("express");
const { body, param } = require("express-validator");

const router = express.Router();

const adminContoller = require("../../controllers/admin/depositMethods.controllers");
const { admin, isAdmin } = require("../../middleware/auth");
const { getApiCheck } = require("../../middleware/helpers");
const { checkKey, checkId } = require("../../middleware/validations");
const Crypto = require("../../models/crypto");

const checkMethodId = (para, message) => {
  return checkId(para, Crypto, message);
};

const checkMethodKey = (para, key, idLocation, idKey, message) => {
  return checkKey(para, Crypto, key, idLocation, idKey, message);
};

router.get("/deposit-methods", admin(adminContoller.getDepositMethod));

router.get(
  "/deposit-method/create",
  isAdmin,
  admin(adminContoller.getAddDepositMethod)
);

router.get(
  "/deposit-method/edit/:methodId",
  isAdmin,
  checkMethodId(param("methodId")),
  admin(adminContoller.getEditDepositMethod)
);

router.post(
  "/deposit-method/create",
  isAdmin,
  [
    checkMethodKey(body("coin"), "coin"),
    checkMethodKey(body("wallet"), "wallet"),
  ],
  adminContoller.postDepositMethod(
    "create",
    "/deposit-method/create",
    "New deposit method Created successfully"
  )
);

router.post(
  "/deposit-method/edit",
  isAdmin,
  [
    checkMethodId(body("_id")),
    checkMethodKey(body("coin"), "coin", "body", "_id"),
    checkMethodKey(body("wallet"), "wallet", "body", "_id"),
  ],
  adminContoller.postDepositMethod(
    "edit",
    "/deposit-method/edit/",
    "The deposit method has been updated successfully"
  )
);

router.post(
  "/deposit-method/disable",
  isAdmin,
  [checkMethodId(body("methodId"))],
  adminContoller.postDepositMethod(
    "disabled",
    "/deposit-methods",
    "The deposit method has been disabled"
  )
);

router.post(
  "/deposit-method/enable",
  isAdmin,
  [checkMethodId(body("methodId"))],
  adminContoller.postDepositMethod(
    "enabled",
    "/deposit-methods",
    "The deposit method has been enabled"
  )
);

router.post(
  "/deposit-method/delete",
  isAdmin,
  [checkMethodId(body("methodId"))],
  adminContoller.postDepositMethod(
    "delete",
    "/deposit-methods",
    "The deposit method has been deleted successfully"
  )
);

router.get(
  "/api/deposit-method/coin/:coin/:methodId",
  isAdmin,
  [checkMethodKey(param("coin"), "coin", "params", "methodId")],
  getApiCheck
);

router.get(
  "/api/deposit-method/wallet/:wallet/:methodId",
  isAdmin,
  [checkMethodKey(param("wallet"), "wallet", "params", "methodId")],
  getApiCheck
);

module.exports = router;
