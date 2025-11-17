const express = require("express");

const router = express.Router();

const homeController = require("../../controllers/home/home.controller");
const { visitor } = require("../../middleware/auth");

router.get("/", visitor(homeController.getIndex));
router.get("/contact", visitor(homeController.getContact));
router.get("/about", homeController.getAbout);
router.get("/faq", homeController.getFaq);
router.get("/terms", homeController.getTerms);
router.get("/policy", homeController.getPolicy);
router.get("/template", homeController.getEmailTemplate);

router.get("/team", homeController.getTeam);
router.get("/testimonials", homeController.getTestimonials);

router.get("/accounts", homeController.getAccounts);
// router.get("/accounts/current", homeController.getAccountCurrent);
// router.get("/accounts/savings", homeController.getAccountSavings);
// router.get("/accounts/salary", homeController.getAccountSalary);
// router.get("/accounts/fixed-deposit", homeController.getAccountFixedDeposit);
// router.get(
//   "/accounts/recuring-deposit",
//   homeController.getAccountRecuringDeposit
// );

// router.get("/cards", visitor(homeController.getCards));
// router.get("/cards/business", homeController.getCardBusiness);
// router.get("/cards/Cashback", homeController.getCardCashback);
// router.get("/cards/Reward", homeController.getCardReward);
// router.get("/cards/Secured", homeController.getCardSecured);
// router.get("/cards/low-interest", homeController.getCardLowInterest);
// router.get("/cards/tarvel-hotel", homeController.getCardTravelHotel);

router.get("/loan", homeController.getLoanHome);
// router.get("/loan/education", homeController.getLoanEducation);
// router.get("/loan/gold", homeController.getLoanGold);
// router.get("/loan/personal", homeController.getLoanPersonal);
// router.get("/loan/vehicle", homeController.getLoanVehicle);

module.exports = router;
