const { validationResult } = require("express-validator");
const Loan = require("../../models/loans");

// /////////
// LOAN
// /////////////

exports.getLoan = async (req, res, next) => {
  const loans = await Loan.find().sort({
    createdAt: -1,
  });

  for (const loan of loans) {
    await loan.populate("user", "name accountNumber profile");

    if (!loan.user) {
      await loan.deleteOne();
    }
  }

  res.render("admin/loans", {
    success: req.flash("success")[0],
    error: req.flash("error")[0],
    message: req.flash("message")[0],
    loans,
    breadcrumb1: ["Loans"],
    breadcrumb2: [],
  });
};

exports.postActionLoan = (action) => {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const loanId = req.body.loanId;
      const loan = await Loan.findById(loanId);

      if (!errors.isEmpty()) {
        req.flash("error", true);
        req.flash("success", false);
        req.flash("message", errors.array()[0].msg);

        return res.redirect(`/users-loans`);
      }

      if (action === "delete") {
        await loan.remove();
      } else if (action === "denied") {
        loan.status = "denied";
        await loan.save();
      } else if (action === "approved") {
        loan.status = "approved";
        loan.approved = new Date();
        await loan.save();

        await loan.fund();
      }

      req.flash("error", false);
      req.flash("success", true);
      req.flash(
        "message",
        `Loan has been ${
          action === "delete"
            ? "deleted"
            : action === "approved"
            ? "Approved"
            : "denied"
        }`
      );

      return res.redirect(`/users-loans`);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};
