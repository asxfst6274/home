const express = require("express");

const router = express.Router();

const adminContoller = require("../../controllers/admin/investments.controllers");
const { admin } = require("../../middleware/auth");

router.get("/investments", admin(adminContoller.getInvestments));

module.exports = router;
