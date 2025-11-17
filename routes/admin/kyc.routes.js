const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/admin/kyc.controllers");
const { isAdmin } = require("../../middleware/auth");

router.get("/user-kyc", isAdmin, adminController.getKyc);

router.post(
  "/kyc/approved",
  isAdmin,
  adminController.postActionKyc("approved")
);

router.post(
  "/kyc/rejected",
  isAdmin,
  adminController.postActionKyc("rejected")
);

router.post("/kyc/pending", isAdmin, adminController.postActionKyc("pending"));

router.post("/kyc/delete", isAdmin, adminController.postActionKyc("delete"));

module.exports = router;
