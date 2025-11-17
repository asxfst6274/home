const dataFile = require("./dataFile");

exports.formatDateTime = (date, locale = "en-GB") => {
  const calcTimePassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / 1000);

  const timePassed = calcTimePassed(new Date(), new Date(date));

  if (timePassed <= 59) return "Just Now";
  if (timePassed <= 119) return `1 minute ago`;
  if (timePassed <= 60 * 59)
    return `${Math.round(timePassed / 60)} minutes ago`;
  if (timePassed <= 60 * 60) return "1 hour ago";
  if (timePassed <= 60 * 60 * 24)
    return `${Math.round(timePassed / (60 * 60))} hours ago`;
  if (timePassed <= 60 * 60 * 47) return "Yesterday";
  if (timePassed <= 60 * 60 * 24 * 7)
    return `${Math.round(timePassed / (60 * 60 * 24))} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

exports.formatDay = (date, locale = "en-GB") => {
  const calcTimePassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / 1000);

  const timePassed = calcTimePassed(new Date(), new Date(date));

  if (timePassed <= 60 * 60 * 24) return `Today`;
  if (timePassed <= 60 * 60 * 47) return "Yesterday";
  if (timePassed <= 60 * 60 * 24 * 7)
    return `${Math.round(timePassed / (60 * 60 * 24))} days ago`;

  return this.formatDateDay(date);
};

exports.dateTime = (date, locale = "en-GB") => {
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

exports.dollar = (amount) => {
  return formatCurrency.format(+amount);
};

exports.groupString = (string, group = 4, separator = " ") => {
  return string
    .split("")
    .map((n, i) => ((i + 1) % group ? n : n + separator))
    .join("");
};

exports.validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

exports.validateName = (value) => {
  return /^[a-zA-Z ]*$/.test(value);
};

exports.alpha = (value) => {
  return /^[a-zA-Z]*$/.test(value);
};

exports.alphaSpace = (value) => {
  return /^[a-zA-Z ]*$/.test(value);
};

exports.alphaNumeric = (value) => {
  return /^[a-zA-Z0-9.]*$/.test(value);
};

exports.alphaNumericSpace = (value) => {
  return /^[a-zA-Z0-9. ]*$/.test(value);
};

exports.numeric = (value) => {
  return /^[0-9.]*$/.test(value);
};

exports.formatDate = (date) => {
  return !date
    ? ""
    : new Date(date).toLocaleString("en-US", {
        // weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
};

exports.formatDateDay = (date) => {
  return !date
    ? ""
    : new Date(date).toLocaleString("en-US", {
        // weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

exports.toTitle = (word) => {
  return word?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
};

exports.getAge = (date) => {
  let dob;
  if (date) dob = new Date(date);
  else dob = new Date();
  const yearsTime = Date.now() - dob;
  const years = Math.trunc(yearsTime / 31536000000);
  return [years, yearsTime];
};

exports.formatFormDate = (date) => {
  if (!date) return;
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
};

exports.getLoanInterest = (amount, date) => {
  const totalWeeks =
    Math.trunc(
      (new Date().getTime() - new Date(date).getTime()) /
        (1000 * 60 * 60 * 24 * 7)
    ) + 1;

  return ((totalWeeks * dataFile.interestRate) / 100) * amount;
};
