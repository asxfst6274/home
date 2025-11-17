import Button from "../../views/form/button.js";
import Checkbox from "../../views/form/checkbox.js";
import Input from "../../views/form/input.js";
import {
  inputFormat,
  checkboxFormat,
  inputLoading,
} from "../../views/form/default.js";
import { numeric, validateEmail, validateName } from "../../helpers.js";

const inputTitle = { value: "", valid: false };
const inputTarget = { value: "", valid: false };

$(".nav-loans").addClass("active");

const submitOnEntry = (isValid, e) => {
  if (!isValid) return $("#submitBtn").attr("type", "button");
  $("#submitBtn").attr("type", "submit");
};

const submitOnClick = async (isValid, e) => {
  if (!isValid) {
    e.preventDefault();
    $("#submitBtn").attr("type", "button");
    return;
  }
  $("#submitBtn").attr("type", "submit");
};

const titleRules = (value, callback) => {
  if (!value) return callback(false, "Please tell us the reason for the loan");
  if (value.length > 50)
    return callback(false, "Reason should not be more than 50 characters");

  return callback(true);
};

const targetRules = (value, callback) => {
  if (!value) return callback(false, "Loan amount is required");
  if (!numeric(value)) return callback(false, "Please use a valid amount");

  return callback(true);
};

const signupBtn = new Button({
  elementId: "submitBtn",
  stores: [inputTitle, inputTarget],
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

new Input({
  parentId: "title",
  store: inputTitle,
  button: signupBtn,
  checkTime: 1,
  rules: titleRules,
  format: inputFormat,
});

new Input({
  parentId: "target",
  store: inputTarget,
  button: signupBtn,
  checkTime: 1,
  rules: targetRules,
  format: inputFormat,
});
