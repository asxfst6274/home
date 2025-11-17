import Button from "../../views/form/button.js";
import Checkbox from "../../views/form/checkbox.js";
import Input from "../../views/form/input.js";
import {
  inputFormat,
  checkboxFormat,
  inputLoading,
} from "../../views/form/default.js";
import { getAge, numeric, validateEmail, validateName } from "../../helpers.js";
import DateInput from "../../views/form/date.js";

const inputDOB = { value: "", valid: false };
const inputIncome = { value: "", valid: false };
const inputOccupation = { value: "", valid: false };
const inputStreet = { value: "", valid: false };
const inputCity = { value: "", valid: false };
const inputState = { value: "", valid: false };
const inputZipCode = { value: "", valid: false };

const submitOnEntry = (isValid, e) => {
  if (!isValid) return $("#submitBtn").attr("type", "button");
  $("#submitBtn").attr("type", "submit");
};

const submitOnClick = (isValid, e) => {
  if (!isValid) {
    e.preventDefault();
    $("#submitBtn").attr("type", "button");
    return;
  }
  $("#submitBtn").attr("type", "submit");
};

const cityRules = (value, callback) => {
  if (!value) return callback(false, "Please input your city name");

  return callback(true);
};

const stateRules = (value, callback) => {
  if (!value) return callback(false, "Please input your state or province");

  return callback(true);
};

const streetRules = (value, callback) => {
  if (!value) return callback(false, "Please input your street address");

  return callback(true);
};

const zipCodeRules = (value, callback) => {
  if (!value) return callback(false, "Postal / Zip code is required");

  return callback(true);
};

const occupationRules = (value, callback) => {
  if (!value) return callback(false, "What's your occupation");

  return callback(true);
};

const incomeRules = (value, callback) => {
  if (!value) return callback(false, "What's your monthly income");

  if (!numeric(value)) return callback(false, "Invalid amount");

  if (+value <= 0) return callback(false, "Invalid amount");

  return callback(true);
};

const dobRules = (value, callback) => {
  if (!value) return callback(false, "What's your date of birth");

  const years = +getAge(value)[0];
  const minAge = +$("#minAge").val();

  if (years < minAge)
    return callback(false, `Users below ${minAge} years are not allowed`);

  return callback(true);
};

const signupBtn = new Button({
  elementId: "submitBtn",
  stores: [
    inputCity,
    inputDOB,
    inputIncome,
    inputOccupation,
    inputStreet,
    inputState,
    inputZipCode,
  ],
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

new Input({
  parentId: "city",
  store: inputCity,
  button: signupBtn,
  checkTime: 1,
  rules: cityRules,
  format: inputFormat,
});

new DateInput({
  parentId: "dob",
  store: inputDOB,
  button: signupBtn,
  checkTime: 1,
  rules: dobRules,
  format: inputFormat,
});

new Input({
  parentId: "income",
  store: inputIncome,
  button: signupBtn,
  checkTime: 1,
  rules: incomeRules,
  format: inputFormat,
});

new Input({
  parentId: "occupation",
  store: inputOccupation,
  button: signupBtn,
  checkTime: 1,
  rules: occupationRules,
  format: inputFormat,
});

new Input({
  parentId: "street",
  store: inputStreet,
  button: signupBtn,
  checkTime: 1,
  rules: streetRules,
  format: inputFormat,
});

new Input({
  parentId: "state",
  store: inputState,
  button: signupBtn,
  checkTime: 1,
  rules: stateRules,
  format: inputFormat,
});

new Input({
  parentId: "zipCode",
  store: inputZipCode,
  button: signupBtn,
  checkTime: 1,
  rules: zipCodeRules,
  format: inputFormat,
});
