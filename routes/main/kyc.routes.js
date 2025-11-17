const express = require("express");

const router = express.Router();

const mainController = require("../../controllers/main/kyc.controller");
const { isUser } = require("../../middleware/auth");
const { imageUploader, imageResizer } = require("../../middleware/imageUpload");

router.get("/kyc", isUser, mainController.getKyc);

router.post(
  "/kyc/upload",
  isUser,
  imageUploader,
  imageResizer("kyc", ["original"], true),
  mainController.postKyc
);

module.exports = router;
