const axios = require("axios");
const dataFile = require("../dataFile");

module.exports = async (
  to,
  subject,
  messageSubject,
  messageContent,
  button,
  buttonUrl
) => {
  return await axios.get(
    `${dataFile.emailApiUrl}?name=${dataFile.name}&email=${dataFile.email}&to=${to}&subject=${subject}&messageContent=${messageContent}&messageSubject=${messageSubject}&url=${dataFile.url}}&button=${button}&buttonUrl=${buttonUrl}&code=thisismyemailsender`
  );
};
