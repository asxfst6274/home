const { validationResult } = require("express-validator");
const Plan = require("../../models/plan");

exports.getManagePlans = async (req, res, next) => {
  try {
    const plans = await Plan.find();
    const premiumPlans = plans.filter((plan) => plan.package === "premium");
    const standardPlans = plans.filter((plan) => plan.package === "standard");
    const basicPlans = plans.filter((plan) => plan.package === "basic");

    res.render("admin/manage-plans", {
      basicPlans: basicPlans,
      premiumPlans: premiumPlans,
      standardPlans: standardPlans,
      success: req.flash("success")[0],
      error: req.flash("error")[0],
      message: req.flash("message")[0],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getCreatePackage = (req, res, next) => {
  try {
    res.render("admin/create-package", {
      package: "",
      title: "",
      min: "",
      max: "",
      returns: "",
      fee: "",
      period: "",
      duration: "",
      description: "",
      error: req.flash("error")[0],
      success: req.flash("success")[0],
      message: req.flash("message")[0],

      editing: false,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postCreatePackage = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("success", false);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/create-plan");
    }

    const package = req.body.package;
    const title = req.body.title;
    const min = req.body.min;
    const max = req.body.max;
    const returns = req.body.return;
    const fee = req.body.fee;
    const period = req.body.period;
    const duration = req.body.duration;
    const description = req.body.description;

    const plan = new Plan({
      package: package,
      title: title,
      min: min,
      max: max,
      returns: returns,
      fee: fee,
      period: period,
      duration: duration,
      description: description,
    });

    await plan.save();

    req.flash("error", false);
    req.flash("success", true);
    req.flash("message", "Package Created successfully");

    return res.redirect("/create-plan");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getEditPlan = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("success", false);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/manage-plans");
    }

    const planId = req.params.planId;
    const plan = await Plan.findById(planId);

    res.render("admin/create-package", {
      id: plan._id,
      package: plan.package,
      title: plan.title,
      min: plan.min,
      max: plan.max,
      returns: plan.returns,
      fee: plan.fee,
      period: plan.period,
      duration: plan.duration,
      description: plan.description,
      error: req.flash("error")[0],
      success: req.flash("success")[0],
      message: req.flash("message")[0],
      editing: true,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postEditPackage = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("success", false);
      req.flash("message", errors.array()[0].msg);

      return res.redirect(`/edit-plan/${req.body.id}`);
    }

    const id = req.body.id;
    const package = req.body.package;
    const title = req.body.title;
    const min = req.body.min;
    const max = req.body.max;
    const returns = req.body.return;
    const fee = req.body.fee;
    const period = req.body.period;
    const duration = req.body.duration;
    const description = req.body.description;

    const plan = await Plan.findById(id);

    plan.package = package;
    plan.title = title;
    plan.min = min;
    plan.max = max;
    plan.returns = returns;
    plan.fee = fee;
    plan.period = period;
    plan.duration = duration;
    plan.description = description;

    await plan.save();

    req.flash("error", false);
    req.flash("success", true);
    req.flash("message", "Package Updated successfully");

    return res.redirect(`/edit-plan/${req.body.id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postActionPlan = (action) => {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        req.flash("error", true);
        req.flash("success", false);
        req.flash("message", errors.array()[0].msg);

        return res.redirect("/manage-plans");
      }

      const planId = req.body.planId;
      const plan = await Plan.findById(planId);

      if (action === "delete") {
        await Plan.findByIdAndRemove(planId);
      } else {
        plan.status = action === "hide" ? "suspended" : "active";

        await plan.save();
      }

      req.flash("error", false);
      req.flash("success", true);
      req.flash(
        "message",
        `${plan.title + ", " + plan.package} package ${
          action === "delete"
            ? "has been deleted"
            : action === "hide"
            ? "has been suspended"
            : "is now active"
        }`
      );

      res.redirect("/manage-plans");
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};
