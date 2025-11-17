exports.getBills = (req, res, next) => {
  res.render("main/bills", {
    title: "User Profile",
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    message: req.flash("message")[0],
  });
};
