const CountryPhoneCode = require("../../models/countryPhoneCode");
const Countries = require("../../models/countries");
const { validationResult } = require("express-validator");

exports.getSettings = (req, res, next) => {
  const phoneCodes = CountryPhoneCode.sort((a, b) => {
    if (a.iso > b.iso) return 1;
    return -1;
  });
  res.render("main/settings", {
    title: "User Profile",
    phoneCodes,
    countries: Countries,
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    message: req.flash("message")[0],
  });
};
