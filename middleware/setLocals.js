const Notification = require("../models/notification");
const Settings = require("../models/settings");
const helpers = require("../helpers");
const dataFile = require("../dataFile");

module.exports = async (req, res, next) => {
  const settings = await Settings.findOne();
  let noticeCount;
  if (req.user) {
    noticeCount = await Notification.find({
      user: req.user._id,
      read: { $ne: true },
    }).countDocuments();
  }

  const minAge = settings.minAge;
  res.locals.isloggedIn = req.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAdmin = req.isAdmin;
  res.locals.cUser = req.user;
  res.locals.helpers = helpers;
  res.locals.noticeCount = noticeCount;
  res.locals.dataFile = { ...dataFile, minAge };
  res.locals.settings = settings;
  next();
};
