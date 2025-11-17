const { validationResult } = require("express-validator");
const Notification = require("../../models/notification");

exports.getNotifications = async (req, res, next) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.render("main/notifications", {
    title: "Notifications",
    notifications,
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    message: req.flash("message")[0],
  });
};

exports.getReadNotification = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        status: true,
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const id = req.params.noticeId;

    const notification = await Notification.findById(id);
    notification.read = true;
    notification.save();

    res.json({
      status: true,
      success: true,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      success: false,
      message: "something went wrong",
    });
  }
};

exports.postDeleteNotification = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);
      res.redirect("/notifications");
    }

    const id = req.body.noticeId;

    await Notification.findByIdAndRemove(id);

    req.flash("success", true);
    req.flash("message", "Notification deleted successfully");

    res.redirect("/notifications");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
