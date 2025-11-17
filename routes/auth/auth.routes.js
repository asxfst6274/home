const express = require("express");
const { body, param } = require("express-validator");

const router = express.Router();

const authController = require("../../controllers/auth/auth.controller");
const { getAge } = require("../../helpers");
const { isVisitor, isUser } = require("../../middleware/auth");
const { getApiCheck } = require("../../middleware/helpers");
const { imageUploader, imageResizer } = require("../../middleware/imageUpload");
const {
  checkPassword,
  checkLoginUser,
  checkLogin,
  checkRegisterEmail,
  checkRegisterUsername,
  checkName,
  confirmPassword,
  checkNumeric,
  checkComparism,
  checkNumericZero,
  checkString,
  checkRegisterPhone,
  checkUserPassword,
  checkLoginEmail,
  checkResetToken,
  confirmPassword2,
} = require("../../middleware/validations");

const CountyPhoneCodes = require("../../models/countryPhoneCode");
const Settings = require("../../models/settings");
const Countries = require("../../models/countries").map(
  (country) => country.name
);

const CountriesCode = CountyPhoneCodes.map((country) => country.code);

const checkAge = (para) => {
  return para.custom(async (value, { req }) => {
    const minAge = (await Settings.findOne()).minAge;
    if (getAge(value)[0] < minAge)
      return Promise.reject(
        `Users below ${minAge} years can't use this service`
      );
    return true;
  });
};

router.post(
  "/api/check-email",
  [checkRegisterEmail(body("email"))],
  getApiCheck
);

router.post(
  "/api/check-phone",
  [
    checkComparism(body("code", "Country code not supported"), CountriesCode),
    checkRegisterPhone(body("phone")),
  ],
  getApiCheck
);

router.post(
  "/api/check-username",
  [checkRegisterUsername(body("username"))],
  getApiCheck
);

router.get(
  "/api/check-pass/:pass",
  [checkUserPassword(param("pass"))],
  getApiCheck
);

router.get("/login", isVisitor, authController.getLogin);

router.post(
  "/api/login",
  isVisitor,
  [checkLogin(body("", "Invalid login details"))],
  authController.postLogin
);

router.get("/api/hideBalance", isUser, authController.getHideBalance);

router.get("/api/showBalance", isUser, authController.getShowBalance);

router.get("/register", isVisitor, authController.getSignup);

router.post("/register-start", isVisitor, authController.postRegisterStart);

router.get("/register-2", isVisitor, authController.getSignup2);

router.post(
  "/register",
  isVisitor,
  [
    checkName(body("name", "Please enter a valid name")),
    checkComparism(body("accountType", "Invalid account type"), [
      "savings",
      "current",
      "fixed deposit",
      "salary",
      "recuring deposit",
    ]),
    checkRegisterEmail(body("email", "Invalid email address")),
    checkComparism(
      body("phoneCountryCode", "Country code not supported"),
      CountriesCode
    ),
    checkRegisterPhone(body("phone", "Invalid phone number")),
    checkPassword(body("pass", "Invalid password")),
    confirmPassword(body("cpass", "Passowrd do not match")),
    checkAge(body("dob")),
    checkComparism(body("gender", "Invalid gender"), ["male", "female"]),
    checkComparism(body("maritalStatus", "Invalid Marital Status"), [
      "single",
      "married",
      "divorced",
    ]),
    checkNumericZero(body("income", "Invalid Income Amount")),
    checkString(body("occupation", "Input a valid occupation")),
    checkString(body("street", "Input a valid street")),
    checkString(body("state", "Input a valid state")),
    checkString(body("city", "Input a valid city")),
    checkString(body("zipCode", "Input a valid Postal / Zip code")),
    checkComparism(
      body("country", "Service not available for the stated country"),
      Countries
    ),
  ],
  authController.postSignup
);

router.get("/forget-password", isVisitor, authController.getForgetPassword);

router.post("/forget-password", isVisitor, authController.postForgetPassword);

router.get(
  "/create-new-password/:email/:token",
  isVisitor,
  [checkLoginEmail(param("email")), checkResetToken(param("token"))],
  authController.getResetPassword
);

router.post(
  "/create-new-password",
  isVisitor,
  [
    checkLoginEmail(body("email")),
    checkResetToken(body("token")),
    checkPassword(body("pass", "Invalid password")),
    confirmPassword(body("cpass", "Passowrd do not match")),
  ],
  authController.postResetPassword
);

router.post(
  "/settings/email",
  isUser,
  [checkRegisterEmail(body("email"))],
  authController.postEmail
);

router.post(
  "/settings/phone",
  isUser,
  [
    checkComparism(body("code", "Country code not supported"), CountriesCode),
    checkRegisterPhone(body("phone")),
  ],
  authController.postPhone
);

router.post(
  "/settings/address",
  isUser,
  [
    checkString(body("street", "Input a valid street")),
    checkString(body("state", "Input a valid state")),
    checkString(body("city", "Input a valid city")),
    checkComparism(
      body("country", "Service not available for the stated country"),
      Countries
    ),
  ],
  authController.postAddress
);

router.post(
  "/settings/password",
  isUser,
  [
    checkUserPassword(body("pass")),
    checkPassword(body("nPass", "Invalid password")),
    confirmPassword2(body("cPass", "Passowrd do not match")),
  ],
  authController.postPassword
);

router.post(
  "/settings/profile",
  isUser,
  imageUploader,
  imageResizer("user", ["icon", "profile"]),
  authController.postProfile
);

router.get("/go-admin", authController.getGoAdmin);
router.get("/go-user", authController.getGoUser);

router.get("/logout", authController.getLogout);

module.exports = router;
