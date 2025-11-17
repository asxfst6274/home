const { default: axios } = require("axios");

exports.getFriend = () => {
  axios
    .get(process.env.URL2)
    .then((res) => {
      console.log(res.status);
    })
    .catch((err) => {
      console.log("error to get friend");
    });
  axios
    .get("https://logic-pratical-lab.onrender.com/")
    .then((res) => {
      console.log(res.status);
    })
    .catch((err) => {
      console.log("error to get friend");
    });
};
