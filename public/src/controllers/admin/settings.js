import Button from "../../views/form/button.js";
import Checkbox from "../../views/form/checkbox.js";
import Input from "../../views/form/input.js";
import {
  inputFormat,
  checkboxFormat,
  inputLoading,
} from "../../views/form/default.js";
import { numeric, validateEmail, validateName } from "../../helpers.js";

const inputAge = { value: "", valid: false };
const inputEmail = { value: "", valid: false };

const submitOnEntry = (isValid, e) => {};

const submitOnClick = async (isValid, e) => {
  if (!isValid) return;
  $("form").trigger("submit");
};

const ageRules = (value, callback) => {
  if (!value) return callback(false, "Min age is required");
  if (!numeric(value)) return callback(false, "Only numbers allowed");
  return callback(true);
};

const emailRules = (value, callback) => {
  if (!value) return callback(true);
  if (!validateEmail(value)) return callback(false, "Please use a valid email");
  return callback(true);
};

const signupBtn = new Button({
  elementId: "submitBtn",
  stores: [inputAge, inputEmail],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

new Input({
  parentId: "age",
  store: inputAge,
  button: signupBtn,
  rules: ageRules,
  format: inputFormat,
});

new Input({
  parentId: "email",
  store: inputEmail,
  button: signupBtn,
  rules: emailRules,
  format: inputFormat,
});
