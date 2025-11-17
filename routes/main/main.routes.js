const express = require("express");

const router = express.Router();

const mainRoutes = [
  require("./beneficiaries.routes"),
  require("./bills.routes"),
  require("./cards.routes"),
  require("./contactUs.routes"),
  require("./deposit.routes"),
  require("./index.routes"),
  require("./notifications.routes"),
  require("./savings.routes"),
  require("./settings.routes"),
  require("./transactions.routes"),
  require("./transfer.routes"),
  require("./loans.routes"),
  require("./kyc.routes"),
];

router.use(mainRoutes);

module.exports = router;
