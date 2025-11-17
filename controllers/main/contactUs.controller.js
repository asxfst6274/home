const { validationResult } = require("express-validator");
const Chat = require("../../models/chat");

exports.getContactUs = async (req, res, next) => {
  const chat = await Chat.findOne({ user: req.user._id });
  console.log(chat);
  res.render("main/contact-us", {
    title: "User Profile",
    chat,
  });
};

exports.getChats = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        status: true,
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const limit = req.query.limit ? req.query.limit : 5;
    let chats = await Chat.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(limit);

    chats = chats.sort(() => -1);

    const count = await Chat.find({ user: req.user._id }).countDocuments();

    res.json({
      status: true,
      success: true,
      data: chats,
      count: count,
    });
  } catch (err) {
    console.log(err);

    res.json({
      status: false,
      success: false,
      message: "something went wrong, please try again later",
    });
  }
};

exports.postChat = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        status: true,
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const message = req.body.message;
    const chat = new Chat({
      from: "user",
      user: req.user._id,
      message,
    });

    await chat.save();

    res.json({
      status: true,
      success: true,
      message: "message sent",
    });
  } catch (err) {
    console.log(err);

    res.json({
      status: false,
      success: false,
      message: "something went wrong, please try again later",
    });
  }
};
