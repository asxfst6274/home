const express = require("express");

const router = express.Router();

const adminController = require("../../controllers/admin/index.controllers");
const { admin } = require("../../middleware/auth");

router.get("/", admin(adminController.getIndex));

module.exports = router;
