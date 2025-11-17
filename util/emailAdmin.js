const Settings = require("../models/settings");
const sendMail = require("./sendMail");

module.exports = async (subject, message, url) => {
  const email = (await Settings.findOne()).email;
  if (!email) return;
  sendMail(email, subject, subject, message, "View", url);
};
