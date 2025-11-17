const { validationResult } = require("express-validator");
const Chat = require("../../models/chat");
const User = require("../../models/user");

const MESSAGE_PER_PAGE = 5;

exports.getMessager = async (req, res, next) => {
  try {
    const chats = await Chat.find({ read: false }).sort({ createdAt: -1 });

    let messages = {};

    for (const chat of chats) {
      const userId = chat.user;
      const ch = await chat.populate("user", "name username");
      if (!messages[userId]) messages[userId] = [];
      messages[userId].push(ch);
    }

    messages = Object.values(messages).map((message) => message[0]);

    res.render("admin/messager", {
      messages: messages,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.apiPostSendMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
        status: true,
        success: false,
        message: errors.array()[0],
      });
    }

    const userId = req.body.userId;
    const message = req.body.message;

    const chat = new Chat({
      from: "admin",
      message: message,
      user: userId,
    });

    await chat.save();

    return res.json({
      status: true,
      success: true,
      message: "success",
    });
  } catch (err) {
    return res.json({
      status: false,
      success: false,
      message: err,
    });
  }
};

exports.getChat = async (req, res, next) => {
  const page = +req.query.page || 1;

  try {
    const userId = req.params.userId;
    const chatCount = await Chat.find({ user: userId }).countDocuments();
    const chats1 = await Chat.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * MESSAGE_PER_PAGE)
      .limit(MESSAGE_PER_PAGE);

    const chats = chats1.sort(() => -1);

    const user = await User.findById(userId);

    res.render("admin/chat", {
      chats: chats,
      user: user,
      page: page,
      firstPage: page === 1,
      lastPage: page * MESSAGE_PER_PAGE >= chatCount,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
