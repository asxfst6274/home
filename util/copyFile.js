const fs = require("fs");
const dataFile = require("../dataFile");
const { randomUUID } = require("crypto");

module.exports = (srcFolder, destFolder, filename, sizesArr) => {
  const ext = filename.split(".").splice(-1)[0];
  const newName = destFolder + "-" + randomUUID() + "." + ext;
  sizesArr.forEach((size) => {
    const original =
      dataFile.uploads.folder + `/${srcFolder}/${size}/` + filename;
    const destination =
      dataFile.uploads.folder + `/${destFolder}/${size}/` + newName;
    fs.copyFile(original, destination, (err) => {
      if (err) console.log(err);
    });
  });
  return newName;
};
