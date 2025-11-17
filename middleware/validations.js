const { body, oneOf, param } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Crypto = require("../models/crypto");
const { default: mongoose } = require("mongoose");
const { toTitle, getAge } = require("../helpers");

exports.checkName = (para) => {
  return para
    .trim()
    .not()
    .isEmpty()
    .isString()
    .isAlpha(undefined, { ignore: " " })
    .isLength({ min: 3, max: 40 })
    .toLowerCase();
};

exports.checkString = (para) => {
  return para.not().isEmpty().isString();
};

exports.checkNumeric = (para) => {
  return para.not().isEmpty().isNumeric();
};

exports.checkNumericZero = (para) => {
  return para
    .not()
    .isEmpty()
    .isNumeric()
    .custom((value) => {
      if (+value <= 0) {
        throw new Error(`value must be greater than 0`);
      }
      return true;
    });
};

exports.checkMax = (para) => {
  return para.custom((value, { req }) => {
    if (+value == 0) {
      throw new Error(`max amount must be greater than 0`);
    }
    if (+value < +req.body.min) {
      throw new Error(`max amount must be greater or equal to min amount`);
    }
    return true;
  });
};

exports.checkEmail = (para) => {
  return para.trim().toLowerCase().isEmail();
};

exports.checkRegisterEmail = (para) => {
  return this.checkEmail(para).custom(async (value, { req }) => {
    const userId = req.user ? req.user._id : undefined;
    const user = !mongoose.Types.ObjectId.isValid(userId)
      ? await User.findOne({ email: value })
      : await User.findOne({ email: value, _id: { $ne: userId } });
    if (user) return Promise.reject("Email Already Exist");
    return true;
  });
};

exports.checkRegisterPhone = (para) => {
  return this.checkNumeric(para)
    .isLength({
      min: 5,
      max: 15,
    })
    .custom(async (value, { req }) => {
      const code = req.body.code ? req.body.code : req.params.code;
      const userId = req.user ? req.user._id : undefined;
      const user = !mongoose.Types.ObjectId.isValid(userId)
        ? await User.findOne({ phone: value, phoneCountryCode: code })
        : await User.findOne({
            phone: value,
            phoneCountryCode: code,
            _id: { $ne: userId },
          });
      if (user) return Promise.reject("Phone Number Already Exist");
      return true;
    });
};

exports.checkRegisterUsername = (para) => {
  return para
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 50 })
    .isAlphanumeric(undefined, { ignore: "-_" })
    .toLowerCase()
    .escape()
    .custom(async (value, { req }) => {
      const userId = req.user ? req.user._id : undefined;
      const user = !mongoose.Types.ObjectId.isValid(userId)
        ? await User.findOne({ username: value })
        : await User.findOne({
            username: value,
            _id: { $ne: userId },
          });
      if (user) return Promise.reject("User Already Exist");
      return true;
    });
};

exports.checkUserPassword = (para) => {
  return para
    .trim()
    .isLength({ min: 6, max: 30 })
    .custom(async (value, { req }) => {
      const userId = req.user ? req.user._id : undefined;
      const user = !mongoose.Types.ObjectId.isValid(userId)
        ? undefined
        : await User.findById(userId);
      if (!user)
        return Promise.reject("Something went wrong, please try again later");
      if (!(await user.verifyPassword(value)))
        return Promise.reject("Incorrect password");
      return true;
    });
};

exports.checkLoginEmail = (para) => {
  return this.checkEmail(para).custom(async (value, { req }) => {
    const user = await User.findOne({ email: value });
    if (!user) return Promise.reject("User Not Found");
    return true;
  });
};

exports.checkLoginUser = (para) => {
  return para
    .trim()
    .not()
    .isEmpty()
    .custom(async (value, { req }) => {
      const user = await User.findOne().or([
        { accountNumber: value },
        { email: value },
      ]);
      console.log(value);
      console.log(user);
      if (!user) return Promise.reject("User Not Found");
      return true;
    });
};

exports.checkLoginUsername = (para) => {
  return para
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 50 })
    .isAlphanumeric(undefined, { ignore: /^[-_]$/ })
    .toLowerCase()
    .escape()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ username: value });
      if (!user) return Promise.reject("User Not Found");
      return true;
    });
};

exports.checkPassword = (para) => {
  return para.trim().isLength({ min: 6, max: 50 });
};

exports.confirmPassword2 = (para) => {
  return para.custom((value, { req }) => {
    console.log(req.body);
    if (value !== req.body.nPass) throw new Error("Password Should Match");
    return true;
  });
};

exports.confirmPassword = (para) => {
  return para.custom((value, { req }) => {
    console.log(req.body);
    if (value !== req.body.pass) throw new Error("Password Should Match");
    return true;
  });
};

exports.checkLogin = (para) => {
  return para.custom(async (_, { req }) => {
    const account = req.body.account.toLowerCase();
    const password = req.body.pass;
    const user = await User.findOne().or([
      { accountNumber: account },
      { email: account },
    ]);
    if (!user) return Promise.reject("User Not Found");

    const doMatch = await user.verifyPassword(password);
    if (!doMatch) return Promise.reject("Incorrect Password");
    if (user.status === "suspended")
      throw new Error("Your account is under review");
    return true;
  });
};

exports.checkUserId = (para) => {
  return para.custom(async (value) => {
    if (!value) throw new Error("Invalid User");
    const user = !mongoose.Types.ObjectId.isValid(value)
      ? undefined
      : await User.findOne({ _id: value });
    if (!user) throw new Error("Invalid User");
    return true;
  });
};

exports.checkPlanId = (para) => {
  return para.custom(async (value) => {
    if (!value) throw new Error("Invalid Plan");
    const plan = await Plan.findById(value);
    if (!plan) throw new Error("Invalid Plan");
    return true;
  });
};

exports.checkCryptoId = (para) => {
  return para.custom(async (value) => {
    if (!value) throw new Error("Invalid Coin");
    const crypto = await Crypto.findById(value);
    if (!crypto) throw new Error("Invalid coin");
    return true;
  });
};

exports.checkMethodId = (para, type) => {
  return para.custom(async (value) => {
    if (!value) throw new Error(`Invalid ${type} method`);
    const method =
      type === "deposit"
        ? await DepositMethod.findById(value)
        : await WithdrawalMethod.findById(value);
    if (!method) throw new Error(`Invalid ${type} method`);
    return true;
  });
};

exports.checkComparism = (para, compareArr) => {
  return para.custom((value, { req }) => {
    if (compareArr.every((compare) => compare !== value)) return false;
    return true;
  });
};

exports.checkResetToken = (para) => {
  return para.custom(async (value, { req }) => {
    const email = req.body.email || req.params.email || req.query.email;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    const userToken = user.resetToken;
    const doMatch = await bcrypt.compare(value, userToken);
    if (!doMatch) throw new Error("Invalid Token");
    if (Date.now() > user.resetTokenExpiration)
      throw new Error("Token Expired");
    return true;
  });
};

exports.checkId = (para, Schema, message) => {
  return para.custom(async (value, { req }) => {
    const model = !mongoose.Types.ObjectId.isValid(value)
      ? undefined
      : await Schema.findById(value);
    if (!model)
      return Promise.reject(
        message || "Something went wrong, please try again later"
      );
    return true;
  });
};

exports.checkOwnerId = (para, Schema, message) => {
  return para.custom(async (value, { req }) => {
    const userId = req.user._id;
    const model = !mongoose.Types.ObjectId.isValid(value)
      ? undefined
      : await Schema.findOne({ _id: value, user: userId });
    if (!model) return Promise.reject(message || "Access Denied");
    return true;
  });
};

exports.checkKey = (para, Schema, key, idLocation, idKey, message) => {
  return para.custom(async (value, { req }) => {
    const modelId = req[idLocation] && req[idLocation][idKey];
    const model = !mongoose.Types.ObjectId.isValid(modelId)
      ? await Schema.findOne({ [key]: value })
      : await Schema.findOne({
          [key]: value,
          _id: { $ne: modelId },
        });
    if (model)
      return Promise.reject(message || toTitle(key) + " already exist");
    return true;
  });
};
