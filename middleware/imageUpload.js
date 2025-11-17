const { randomUUID } = require("crypto");
const { validationResult } = require("express-validator");

const multer = require("multer");
const dataFile = require("../dataFile");
const MulterSharpResizer = require("./npm/multerSharpResizer");
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    return cb(null, true);
  } else cb("Invalid Image format", false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 5242880,
  },
}).fields([
  { name: "user", maxCount: 1 },
  { name: "beneficiary", maxCount: 1 },
  { name: "transaction", maxCount: 1 },
  { name: "kyc", maxCount: 1 },
]);

exports.imageUploader = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(err);
      req.flash("error", true);
      req.flash("message", err.message);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log(err);
      req.flash("error", true);
      req.flash("message", err);
    }
    next();
  });
};

exports.imageResizer = (imageName, sizesArr, compress, qualityRate) => {
  return async (req, res, next) => {
    try {
      // check for input errors first
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next();

      //   Proceed
      const filename = {};

      filename[imageName] = `${imageName}-${randomUUID()}`;

      const sizes = [
        { path: "original", width: null, height: null },
        {
          path: "large",
          width: 600,
          height: 400,
        },
        {
          path: "medium",
          width: 300,
          height: 200,
        },
        {
          path: "small",
          width: 150,
          height: 100,
        },
        {
          path: "profile",
          width: 80,
          height: 80,
        },
        {
          path: "icon",
          width: 64,
          height: 64,
        },
      ].filter((obj) => {
        if (!sizesArr) return true;
        if (sizesArr.includes(obj.path)) return true;
      });

      //   const uploadPath = `public/share/images/${imageName}`;
      const uploadPath = `${dataFile.uploads.folder}/${imageName}`;

      const fileUrl = `${req.protocol}://${req.get(
        "host"
      )}/share/images/${imageName}`;

      const sharpOptions = {
        fit: "cover",
        background: { r: 255, g: 255, b: 255 },
      };

      const resizeObject = new MulterSharpResizer(
        req,
        filename,
        sizes,
        uploadPath,
        fileUrl,
        sharpOptions,
        compress,
        qualityRate
      );

      await resizeObject.resize();
      const getDataUploaded = resizeObject.getData();

      req.body[imageName] = getDataUploaded[imageName];
    } catch (err) {
      console.log(err);
      req.flash("error", true);
      req.flash("message", "Something went wrong, please try again later");
    }
    next();
  };
};
