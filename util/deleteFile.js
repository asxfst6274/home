const fs = require("fs");
const path = require("path");
const dataFile = require("../dataFile");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

module.exports = async (name, filename) => {
  const sizes = ["original", "large", "medium", "small", "profile", "icon"];

  sizes.forEach(async (size) => {
    const filePath = path.join(dataFile.uploads.folder, name, size, filename);
    fs.access(filePath, (err) => {
      if (err) {
        // console.log(err);
        return;
      }

      if (process.env.CLOUDINARY) {
        const deleteId =
          process.env.CLOUDINARY_PROJECT +
          "/" +
          name +
          "/" +
          size +
          "/" +
          filename.split(".").slice(0, -1).join(".");

        cloudinary.uploader.destroy(deleteId).then((res) => {
          console.log(res);
        });
      }

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
      });
    });
  });
};
