const path = require("path");
const rootDir = require("./util/path");
// const url = "http://localhost:3000";
// const url = "https://my-bank-app.onrender.com";

module.exports = {
  name: "Asox First",
  title: "Asox First - Banking Made Easy",
  routing: "092303752",
  url: process.env.URL,
  liveChat: process.env.LIVE_CHAT,
  imageHost: process.env.IMAGE_HOST,
  emailApiUrl: "https://betaversecapital.com/api/send-email-1.php",
  appLink: true,
  logo: `/share/images/logo.png`,
  logo2: `/share/images/logo2.png`,
  logo3: `/share/images/logo3.png`,
  email: "support@asoxfirst.com",
  // phone: "+1 716 4642 799",
  location: "",
  address1: "",
  address2: "UK",
  interestRate: 5,
  year: 1905,
  age: new Date().getFullYear() - 1905,
  uploads: {
    folder: path.join(rootDir, "public", "share", "images"),
    userFolder: path.join(rootDir, "public", "share", "images", "user"),
    beneficiaryFolder: path.join(
      rootDir,
      "public",
      "share",
      "images",
      "beneficiary"
    ),
  },
};
