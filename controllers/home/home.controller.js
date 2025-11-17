exports.getIndex = (req, res, next) => {
  res.render("home/index");
};

exports.getAbout = (req, res, next) => {
  res.render("home/about");
};

exports.getFaq = (req, res, next) => {
  res.render("home/faq");
};

exports.getTerms = (req, res, next) => {
  res.render("home/terms");
};

exports.getPolicy = (req, res, next) => {
  res.render("home/policy");
};

exports.getEmailTemplate = (req, res, next) => {
  res.render("others/email-template");
};

exports.getContact = (req, res, next) => {
  res.render("home/contact");
};

exports.getAccounts = (req, res, next) => {
  res.render("home/accounts");
};

exports.getAccountCurrent = (req, res, next) => {
  res.render("home/account-current");
};

exports.getAccountFixedDeposit = (req, res, next) => {
  res.render("home/account-fixed-dep");
};

exports.getAccountRecuringDeposit = (req, res, next) => {
  res.render("home/account-recuring-dep");
};

exports.getAccountSalary = (req, res, next) => {
  res.render("home/account-salary");
};

exports.getAccountSavings = (req, res, next) => {
  res.render("home/account-savings");
};

exports.getCards = (req, res, next) => {
  res.render("home/cards");
};

exports.getCardBusiness = (req, res, next) => {
  res.render("home/cards-business");
};

exports.getCardCashback = (req, res, next) => {
  res.render("home/cards-cashback");
};

exports.getCardLowInterest = (req, res, next) => {
  res.render("home/cards-low-interest");
};

exports.getCardReward = (req, res, next) => {
  res.render("home/cards-rewards");
};

exports.getCardSecured = (req, res, next) => {
  res.render("home/cards-secured");
};

exports.getCardTravelHotel = (req, res, next) => {
  res.render("home/cards-travel-hotel");
};

exports.getCareers = (req, res, next) => {
  res.render("home/careers");
};

exports.getCareersDetails = (req, res, next) => {
  res.render("home/careers-details");
};

exports.getLoanHome = (req, res, next) => {
  res.render("home/loan-home");
};

exports.getLoanPersonal = (req, res, next) => {
  res.render("home/loan-personal");
};

exports.getLoanEducation = (req, res, next) => {
  res.render("home/loan-education");
};

exports.getLoanVehicle = (req, res, next) => {
  res.render("home/loan-vehicle");
};

exports.getLoanGold = (req, res, next) => {
  res.render("home/loan-gold");
};

exports.getTeam = (req, res, next) => {
  res.render("home/team");
};

exports.getTestimonials = (req, res, next) => {
  res.render("home/testimonials");
};
