const express = require("express");

const router = express.Router();

const errorController = require("../../controllers/error/error.controller");

router.get("/500", errorController.get500);

router.use(errorController.get404);

router.use((error, req, res, next) => {
  console.log(error);
  res.redirect("/500");
});

module.exports = router;
