const express = require("express");

const router = express.Router();

const adminContoller = require("../../controllers/admin/packages.controllers");
const { isAdmin, admin } = require("../../middleware/auth");
const { body, param } = require("express-validator");
const {
  checkString,
  checkNumericZero,
  checkMax,
  checkNumeric,
  checkPlanId,
} = require("../../middleware/validations");
const Plan = require("../../models/plan");

const checkPackage = (para) => {
  return para.custom((value) => {
    if (value !== "premium" && value !== "standard" && value !== "basic")
      throw new Error("Invalid Package type");
    return true;
  });
};

const checkPeriod = (para) => {
  return para.custom((value) => {
    if (
      value !== "hours" &&
      value !== "days" &&
      value !== "weeks" &&
      value !== "months"
    )
      throw new Error("Invalid Period Interval");
    return true;
  });
};

router.get("/manage-plans", isAdmin, adminContoller.getManagePlans);
router.get("/edit-plan/:planId", isAdmin, adminContoller.getEditPlan);
router.get("/create-package", isAdmin, adminContoller.getCreatePackage);

router.post(
  "/create-plan",
  isAdmin,
  [
    checkString(body("title")).isLength({ max: 30 }).escape(),
    checkNumericZero(body("min")),
    checkMax(body("max")),
    checkNumericZero(body("return")),
    checkNumeric(body("fee")),
    checkNumericZero(body("duration")),
    checkString(body("description")).isLength({ min: 10, max: 50 }).escape(),
    checkPackage(body("package")),
    checkPeriod(body("period")),
  ],
  adminContoller.postCreatePackage
);

router.post(
  "/edit-plan",
  isAdmin,
  [
    checkString(body("title")).isLength({ max: 30 }).escape(),
    checkNumericZero(body("min")),
    checkMax(body("max")),
    checkNumericZero(body("return")),
    checkNumeric(body("fee")),
    checkNumericZero(body("duration")),
    checkString(body("description")).isLength({ min: 10, max: 50 }).escape(),
    checkPlanId(body("id")),
    checkPackage(body("package")),
    checkPeriod(body("period")),
  ],
  adminContoller.postEditPackage
);

router.post(
  "/hide-plan",
  isAdmin,
  [checkPlanId(body("planId"))],
  adminContoller.postActionPlan("hide")
);

router.post(
  "/unhide-plan",
  isAdmin,
  [checkPlanId(body("planId"))],
  adminContoller.postActionPlan("unhide")
);

router.post(
  "/delete-plan",
  isAdmin,
  [checkPlanId(body("planId"))],
  adminContoller.postActionPlan("delete")
);

module.exports = router;
