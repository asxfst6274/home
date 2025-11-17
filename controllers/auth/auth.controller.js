const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { validationResult } = require("express-validator");
const Countries = require("../../models/countries");
const CountyPhoneCodes = require("../../models/countryPhoneCode");
const AccountNumber = require("../../models/accountNumber");
const deleteFile = require("../../util/deleteFile");
const dataFile = require("../../dataFile");
const sendMail = require("../../util/sendMail");
const Settings = require("../../models/settings");

exports.getLogin = async (req, res, next) => {
  res.render("auth/login", {
    success: req.flash("success")[0],
    error: req.flash("error")[0],
    message: req.flash("message")[0],
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const account = req.body.account;
    if (!errors.isEmpty()) {
      return res.json({
        status: true,
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const user = await User.findOne().or([
      { accountNumber: account },
      { email: account },
    ]);

    req.session.userId = user._id;
    await req.session.save();

    const lastPath = req.cookies.lastPath;
    req.session.inAdmin = req.cookies.inAdmin;
    await req.session.save();

    res.json({
      status: true,
      success: true,
      message: "success",
      lastPath: lastPath,
    });
  } catch (err) {
    res.json({
      status: false,
      success: false,
      message: err,
    });
  }
};

exports.getSignup = async (req, res, next) => {
  // const accountNumber = await AccountNumber.findOne();

  // const number = await accountNumber.newNumber();

  const phoneCodes = CountyPhoneCodes.sort((a, b) => {
    if (a.iso > b.iso) return 1;
    return -1;
  });
  res.render("auth/register", {
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    message: req.flash("message")[0],
    phoneCodes,
    name: req.flash("register-name")[0],
    accountType: req.flash("register-accountType")[0],
    email: req.flash("register-email")[0],
    phoneCountryCode: req.flash("register-phoneCountryCode")[0],
    iso: req.flash("register-iso")[0],
    phone: req.flash("register-phone")[0],
    pass: req.flash("register-pass")[0],
    cpass: req.flash("register-cpass")[0],
    dob: req.flash("register-dob")[0],
    gender: req.flash("register-gender")[0],
    maritalStatus: req.flash("register-maritalStatus")[0],
    income: req.flash("register-income")[0],
    occupation: req.flash("register-occupation")[0],
    street: req.flash("register-street")[0],
    state: req.flash("register-state")[0],
    city: req.flash("register-city")[0],
    zipCode: req.flash("register-zipCode")[0],
    country: req.flash("register-country")[0],
    terms: req.flash("register-terms")[0],
  });
};

exports.getSignup2 = (req, res, next) => {
  const phoneCodes = CountyPhoneCodes.sort((a, b) => {
    if (a.iso > b.iso) return 1;
    return -1;
  });
  res.render("auth/register-2", {
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    message: req.flash("message")[0],
    phoneCodes,
    name: req.flash("register-name")[0],
    accountType: req.flash("register-accountType")[0],
    email: req.flash("register-email")[0],
    phoneCountryCode: req.flash("register-phoneCountryCode")[0],
    iso: req.flash("register-iso")[0],
    phone: req.flash("register-phone")[0],
    pass: req.flash("register-pass")[0],
    cpass: req.flash("register-cpass")[0],
    dob: req.flash("register-dob")[0],
    gender: req.flash("register-gender")[0],
    maritalStatus: req.flash("register-maritalStatus")[0],
    income: req.flash("register-income")[0],
    occupation: req.flash("register-occupation")[0],
    street: req.flash("register-street")[0],
    state: req.flash("register-state")[0],
    city: req.flash("register-city")[0],
    zipCode: req.flash("register-zipCode")[0],
    country: req.flash("register-country")[0],
    countries: Countries,
  });
};

exports.postRegisterStart = async (req, res, next) => {
  try {
    const accountType = req.body.accountType;
    const name = req.body.name;
    const phoneCountryCode = req.body.phoneCountryCode.split(",,,")[0];
    const iso = req.body.phoneCountryCode.split(",,,")[1];
    const phone = req.body.phone;
    const email = req.body.email;
    const pass = req.body.pass;
    const cpass = req.body.cpass;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const maritalStatus = req.body.maritalStatus;
    const income = req.body.income;
    const occupation = req.body.occupation;
    const street = req.body.street;
    const state = req.body.state;
    const city = req.body.city;
    const zipCode = req.body.zipCode;
    const country = req.body.country;

    req.flash("register-accountType", accountType);
    req.flash("register-name", name);
    req.flash("register-phoneCountryCode", phoneCountryCode);
    req.flash("register-phone", phone);
    req.flash("register-iso", iso);
    req.flash("register-email", email);
    req.flash("register-pass", pass);
    req.flash("register-cpass", cpass);
    req.flash("register-dob", dob);
    req.flash("register-gender", gender);
    req.flash("register-maritalStatus", maritalStatus);
    req.flash("register-income", income);
    req.flash("register-occupation", occupation);
    req.flash("register-street", street);
    req.flash("register-state", state);
    req.flash("register-city", city);
    req.flash("register-zipCode", zipCode);
    req.flash("register-country", country);

    res.redirect("/register-2");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postSignup = async (req, res, next) => {
  try {
    const settings = await Settings.findOne();
    const status = settings.pendNewUsers ? "pending" : "verified";
    const accountType = req.body.accountType;
    const name = req.body.name;
    const phoneCountryCode = req.body.phoneCountryCode.split(",,,")[0];
    const iso = req.body.phoneCountryCode.split(",,,")[1];
    const phone = req.body.phone;
    const email = req.body.email;
    const pass = req.body.pass;
    const cpass = req.body.cpass;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const maritalStatus = req.body.maritalStatus;
    const income = req.body.income;
    const occupation = req.body.occupation;
    const street = req.body.street;
    const state = req.body.state;
    const city = req.body.city;
    const zipCode = req.body.zipCode;
    const country = req.body.country;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("register-accountType", accountType);
      req.flash("register-name", name);
      req.flash("register-phoneCountryCode", phoneCountryCode);
      req.flash("register-phone", phone);
      req.flash("register-iso", iso);
      req.flash("register-email", email === "@" ? "" : email);
      req.flash("register-pass", pass);
      req.flash("register-cpass", cpass);
      req.flash("register-dob", dob);
      req.flash("register-gender", gender);
      req.flash("register-maritalStatus", maritalStatus);
      req.flash("register-income", income);
      req.flash("register-occupation", occupation);
      req.flash("register-street", street);
      req.flash("register-state", state);
      req.flash("register-city", city);
      req.flash("register-zipCode", zipCode);
      req.flash("register-country", country);
      req.flash("register-terms", true);
      req.flash("error", true);
      // req.flash("message", errors.array()[0].msg);
      req.flash(
        "message",
        "Something went wrong, Please make sure your details are correct"
      );

      const param = errors.array()[0].param;
      if (
        param === "name" ||
        param === "accountType" ||
        param === "phoneCountryCode" ||
        param === "phone" ||
        param === "email" ||
        param === "pass" ||
        param === "cpass"
      )
        return res.redirect("/register");
      else return res.redirect("/register-2");
    }

    const actNum = await AccountNumber.findOne();
    const accountNumber = await actNum.newNumber();

    const user = new User({
      name: name,
      email: email,
      accountNumber: accountNumber,
      accountType: accountType,
      city: city,
      dob: dob,
      country: country,
      gender: gender,
      income: income,
      maritalStatus: maritalStatus,
      occupation: occupation,
      phone: phone,
      phoneCountryCode: phoneCountryCode,
      state: state,
      street: street,
      zipCode: zipCode,
      status: status,
    });

    // await user.save();
    await user.setPassword(pass);
    await user.save();

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const messageSubject = "New User";
      const messageContent = `A new user ${email} just registered to your platform`;

      sendMail(
        `${adminEmail}`,
        messageSubject,
        messageSubject,
        messageContent,
        "Goto Website",
        `${dataFile.url}`
      );
    }

    const messageSubject = `Welcome To ${dataFile.name}`;
    const messageContent = `Your account has been created successfully you can now log in into your account using your account number below:<p style="text-align: center; font-weight: bold; font-size: 24px; margin-bottom:1.5rem; margin-top:-1rem">${accountNumber}</p>`;

    sendMail(
      `${email}`,
      messageSubject,
      messageSubject,
      messageContent,
      "Goto Website",
      `${dataFile.url}`
    );

    req.session.userId = user._id;
    await req.session.save();

    return res.redirect("/");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getForgetPassword = (req, res, next) => {
  res.render("auth/forget-password", {
    success: req.flash("success")[0],
    error: req.flash("error")[0],
    message: req.flash("message")[0],
    email: req.flash("email")[0],
  });
};

exports.postForgetPassword = (req, res, next) => {
  try {
    const errors = validationResult(req);
    const email = req.body.email;

    if (!errors.isEmpty()) {
      req.flash("email", email);
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/forget-password");
    }

    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      const token = buffer.toString("hex");

      const user = await User.findOne({ email: email });

      if (!user) {
        req.flash("email", email);
        req.flash("error", true);
        req.flash("message", "No Aaccount is attached with this email");
        return res.redirect("/forget-password");
      }

      const hashedToken = await bcrypt.hash(token, 12);

      user.resetToken = hashedToken;
      user.resetTokenExpiration = Date.now() + 1800000;
      user.save();

      const messageSubject = `Reset Password`;
      const messageContent = `Click the botton below to reset your password`;

      sendMail(
        `${email}`,
        messageSubject,
        messageSubject,
        messageContent,
        "Reset",
        `${dataFile.url}/create-new-password/${email}/${token}`
      );

      req.flash("success", true);
      req.flash(
        "message",
        "A password recover link has been sent to your email address"
      );
      return res.redirect("/forget-password");
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getResetPassword = (req, res, next) => {
  const errors = validationResult(req);
  req.flash("email", req.params.email);
  req.flash("token", req.params.token);

  if (!errors.isEmpty()) {
    req.flash("error", true);
    req.flash("message", errors.array()[0].msg);

    return res.redirect("/forget-password");
  }
  res.render("auth/reset-password", {
    success: req.flash("success")[0],
    error: req.flash("error")[0],
    message: req.flash("message")[0],
    email: req.flash("email")[0],
    token: req.flash("token")[0],
    pass: req.flash("pass")[0],
    cpass: req.flash("cpass")[0],
  });
};

exports.postResetPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);
      req.flash("email", req.body.email);
      req.flash("token", req.body.token);
      req.flash("pass", req.body.pass);
      req.flash("cpass", req.body.cpass);

      return res.redirect("/forget-password");
    }
    const email = req.body.email;
    const pass = req.body.pass;

    const user = await User.findOne({ email });
    await user.setPassword(pass);
    await user.save();

    req.flash("success", true);
    req.flash("message", "Your password has been updated successfully.");

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postEmail = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/settings");
    }

    const email = req.body.email;
    req.user.email = email;
    await req.user.save();

    req.flash("success", true);
    req.flash("message", "Your email has been updated successfully");

    res.redirect("/settings");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postPhone = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/settings");
    }

    const phone = req.body.phone;
    const phoneCountryCode = req.body.code;

    req.user.phone = phone;
    req.user.phoneCountryCode = phoneCountryCode;

    await req.user.save();

    req.flash("success", true);
    req.flash("message", "Your phone number has been updated successfully");

    res.redirect("/settings");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postAddress = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/settings");
    }

    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;

    req.user.street = street;
    req.user.city = city;
    req.user.state = state;
    req.user.country = country;

    await req.user.save();

    req.flash("success", true);
    req.flash("message", "Your address has been updated successfully");

    res.redirect("/settings");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/settings");
    }

    const pass = req.body.nPass;

    await req.user.setPassword(pass);

    await req.user.save();

    req.flash("success", true);
    req.flash("message", "Your password has been updated successfully");

    res.redirect("/settings");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/settings");
    }

    const profile = req.body.user[0].profile.filename;

    const oldProfile = req.user.profile;
    if (oldProfile) deleteFile("user", oldProfile);

    req.user.profile = profile;

    // req.user.profile = profile
    //   ?.replace(".jpeg", ".jpeg-file")
    //   .replace(".jpg", ".jpeg-file")
    //   .replace(".png", ".jpeg-file");

    await req.user.save();

    req.flash("success", true);
    req.flash("message", "Profile Updated");

    res.redirect("/settings");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.clearCookie("lastPath");
    res.redirect("/login");
  });
};

exports.getHideBalance = async (req, res, next) => {
  req.user.hideBalance = true;
  req.user.save();
  res.json({
    success: true,
  });
};

exports.getShowBalance = async (req, res, next) => {
  req.user.hideBalance = false;
  req.user.save();
  res.json({
    success: true,
  });
};

exports.getGoAdmin = async (req, res, next) => {
  console.log(req.isAdmin);
  if (req.isAdmin) {
    req.session.inAdmin = true;
    await req.session.save();

    req.session.viewMode = false;
    await req.session.save();

    req.session.viewUserId = null;
    await req.session.save();

    res.cookie("inAdmin", true, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  }
  res.redirect("/");
};

exports.getGoUser = async (req, res, next) => {
  req.session.inAdmin = false;
  await req.session.save();
  res.clearCookie("inAdmin");

  res.redirect("/");
};
