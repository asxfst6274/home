const { validationResult } = require("express-validator");

exports.addEditing = (req, res, next) => {
  req.myCustomEditing = true;
  next();
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
