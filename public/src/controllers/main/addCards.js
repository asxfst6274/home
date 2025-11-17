import Button from "../../views/form/button.js";
import Input from "../../views/form/input.js";
import { inputFormat, resetInputFormat } from "../../views/form/default.js";
import { dollar, numeric, validateName } from "../../helpers.js";
import Select from "../../views/form/select.js";

const inputCardType = { value: "", valid: true };
const inputName = { value: "", valid: false };
const inputNumber = { value: "", valid: false };
const inputMonth = { value: "", valid: false };
const inputYear = { value: "", valid: false };
const inputCVV = { value: "", valid: false };

$(".nav-card").addClass("active");

const inputFormatCustom = (valid, message, e, parentEle) => {
  const messageEle = document.querySelector(".date-message");

  if (valid) return (messageEle.innerHTML = "");

  messageEle.innerHTML = `
      <p 
      class="${
        valid ? "text-success" : "text-danger"
      } tw-text-sm tw-mt-[-15px] text-left d-flex align-items-center tw-gap-2"
    >
   ${message}
    </p>`;
};

const submitOnEntry = (isValid, e, btn) => {};

const submitOnClick = async (isValid, e, btn) => {
  if (!isValid) return;
  $("form").trigger("submit");
};

const cardTypeRules = (value) => {};

const nameRules = (value, callback) => {
  if (!value) return callback(false, "Name is required");
  if (value.length < 3 || value.length > 30)
    return callback(false, "Name should be between 3 and 30 characters");

  if (!validateName(value))
    return callback(false, "Name must be alphabet only");

  return callback(true, "Confirm");
};

const numberRules = async (value, callback) => {
  if (!value) return callback(false, "Amount is required");
  if (!numeric(value)) return callback(false, "Invalid card number");
  if (value.length < 12 || value.length > 20)
    return callback(false, "Invalid card");

  const cardId = $("#cardId").val() ? $("#cardId").val() : 1;
  const res = await $.get(`/api/card/check-number/${value}/${cardId}`);

  return callback(res.success, res.message);
};

const monthRules = (value, callback) => {
  if (!value) return callback(false, "Invalid Expiring date");
  if (!numeric(value)) return callback(false, "Invalid Expiring date");
  if (+value <= 0) return callback(false, "Invalid Expiring date");

  const thisMonth = 1 + +new Date().getMonth();
  const thisYear = +new Date().getFullYear().toString().slice(2);

  const year = +$("#year select").find(":selected").val();
  const month = +$("#month select").find(":selected").val();

  if (!year) return callback(true, "confirm");

  if (thisYear > year) return callback(false, "Invalid Expiring date");

  if (thisYear === year && thisMonth > month)
    return callback(false, "Invalid Expiring date");

  return callback(true, "Confirm");
};

const yearRules = (value, callback) => {
  if (!value) return callback(false, "Invalid Expiring date");
  if (!numeric(value)) return callback(false, "Invalid Expiring date");
  if (+value <= 0) return callback(false, "Invalid Expiring date");

  return callback(true, "Confirm");
};

const cvvRules = (value, callback) => {
  if (!value) return callback(false, "Invalid CVV");
  if (!numeric(value)) return callback(false, "Invalid CVV");
  if (+value <= 0) return callback(false, "Invalid CVV");
  if (value.length < 3 || value.length > 4)
    return callback(false, "Invalid CVV");

  return callback(true, "Confirm");
};

const submitBtn = new Button({
  elementId: "submitBtn",
  stores: [inputCVV, inputMonth, inputName, inputNumber, inputYear],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

new Select({
  parentId: "cardType",
  store: inputCardType,
  rules: cardTypeRules,
  format: inputFormat,
});

new Input({
  parentId: "name",
  store: inputName,
  button: submitBtn,
  rules: nameRules,
  format: inputFormat,
});

new Input({
  parentId: "number",
  store: inputNumber,
  button: submitBtn,
  rules: numberRules,
  format: inputFormat,
});

const month = new Select({
  parentId: "month",
  store: inputMonth,
  button: submitBtn,
  rules: monthRules,
  format: inputFormatCustom,
});

new Select({
  parentId: "year",
  store: inputYear,
  dependance: [month],
  button: submitBtn,
  rules: yearRules,
  format: inputFormatCustom,
});

new Input({
  parentId: "cvv",
  store: inputCVV,
  button: submitBtn,
  rules: cvvRules,
  format: inputFormat,
});
