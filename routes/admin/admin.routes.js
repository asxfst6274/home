const express = require("express");

const router = express.Router();

const adminRoutes = [
  require("./loans.routes"),
  require("./index.routes"),
  require("./users.routes"),
  require("./transactions.routes"),
  require("./depositMethods.routes"),
  require("./settings.routes"),
  require("./kyc.routes"),
];

router.use(adminRoutes);

module.exports = router;
