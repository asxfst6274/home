const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const mainController = require("../../controllers/main/contactUs.controller");
const { numeric } = require("../../helpers");
const { isUser, user } = require("../../middleware/auth");

// router.get("/contact", user(mainController.getContactUs));

// router.get(
//   "/api/chats",
//   [
//     body().custom((value, { req }) => {
//       const limit = req.query.limit;
//       if (!limit) return true;
//       if (!numeric(limit))
//         throw new Error("Something went wrong, please try again");
//       if (+limit < 0) throw new Error("Something went wrong, please try again");
//       return true;
//     }),
//   ],
//   user(mainController.getChats)
// );

// router.post(
//   "/api/send-chat",
//   [body("message").not().isEmpty().escape()],
//   user(mainController.postChat)
// );

module.exports = router;
