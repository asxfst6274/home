const { validationResult } = require("express-validator");
const Card = require("../../models/card");

exports.getCards = async (req, res, next) => {
  const cards = await Card.find({ user: req.user._id }).sort({ updatedAt: -1 });
  res.render("main/my-cards", {
    title: "User Profile",
    cards,
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    message: req.flash("message")[0],
  });
};

exports.getAddCard = (req, res, next) => {
  res.render("main/new-card", {
    title: "User Profile",
    editing: false,
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    message: req.flash("message")[0],
    id: req.flash("card-id")[0],
    type: req.flash("card-type")[0],
    name: req.flash("card-name")[0],
    number: req.flash("card-number")[0],
    month: req.flash("card-month")[0],
    year: req.flash("card-year")[0],
    cvv: req.flash("card-cvv")[0],
  });
};

exports.getEditCard = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      res.redirect("/cards");
    }

    const cardId = req.params.cardId;

    const card = await Card.findById(cardId);

    const expire = card.expire;
    const month = expire.split("/")[0];
    const year = expire.split("/")[1];

    req.flash("card-id", cardId);
    req.flash("card-type", card.type);
    req.flash("card-name", card.name);
    req.flash("card-number", card.number);
    req.flash("card-month", month);
    req.flash("card-year", year);
    req.flash("card-cvv", card.cvv);

    res.render("main/new-card", {
      title: "User Profile",
      editing: true,
      error: req.flash("error")[0],
      success: req.flash("success")[0],
      message: req.flash("message")[0],
      id: req.flash("card-id")[0],
      type: req.flash("card-type")[0],
      name: req.flash("card-name")[0],
      number: req.flash("card-number")[0],
      month: req.flash("card-month")[0],
      year: req.flash("card-year")[0],
      cvv: req.flash("card-cvv")[0],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getApiCheck = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        status: true,
        success: false,
        message: errors.array()[0].msg,
      });
    }

    return res.json({
      status: true,
      success: true,
      message: "confirm",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      success: false,
      message: "something went wrong. please try again",
    });
  }
};

exports.postCard = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const type = req.body.type;
    const name = req.body.name;
    const number = req.body.number;
    const month = req.body.month;
    const year = req.body.year;
    const cvv = req.body.cvv;

    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      req.flash("card-type", type);
      req.flash("card-name", name);
      req.flash("card-number", number);
      req.flash("card-month", month);
      req.flash("card-year", year);
      req.flash("card-cvv", cvv);

      return res.redirect("/add-card");
    }

    const expire = month + "/" + year;

    const card = new Card({
      cvv,
      expire,
      name,
      number,
      type,
      user: req.user._id,
    });

    await card.save();

    req.flash("success", true);
    req.flash("message", "Card added successfully");

    res.redirect("/cards");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postEditCard = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const id = req.body.cardId;
    const type = req.body.type;
    const name = req.body.name;
    const number = req.body.number;
    const month = req.body.month;
    const year = req.body.year;
    const cvv = req.body.cvv;
    if (!errors.isEmpty()) {
      console.log(err);

      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      req.flash("card-id", id);
      req.flash("card-type", type);
      req.flash("card-name", name);
      req.flash("card-number", number);
      req.flash("card-month", month);
      req.flash("card-year", year);
      req.flash("card-cvv", cvv);

      return res.redirect("/edit-card/" + id);
    }

    const card = await Card.findById(id);
    card.type = type;
    card.name = name;
    card.number = number;
    card.month = month;
    card.year = year;
    card.cvv = cvv;

    await card.save();

    req.flash("success", true);
    req.flash("message", "update successful");

    res.redirect("/cards");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postDeleteCard = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", true);
      req.flash("message", errors.array()[0].msg);

      return res.redirect("/cards");
    }

    const cardId = req.body.cardId;
    await Card.findByIdAndRemove(cardId);

    req.flash("success", true);
    req.flash("message", "Card deleted successfully");

    res.redirect("/cards");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
