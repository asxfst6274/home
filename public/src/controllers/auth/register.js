import Button from "../../views/form/button.js";
import Checkbox from "../../views/form/checkbox.js";
import Input from "../../views/form/input.js";
import {
  inputFormat,
  checkboxFormat,
  inputLoading,
} from "../../views/form/default.js";
import { numeric, validateEmail, validateName } from "../../helpers.js";

const inputName = { value: "", valid: false };
const inputPhone = { value: "", valid: false };
const inputEmail = { value: "", valid: false };
const inputPassword = { value: "", valid: false };
const inputConfirmPassword = { value: "", valid: false };
const inputTerms = { value: false, valid: false };

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

const nameRules = (value, callback) => {
  if (!value) return callback(false, "Name is required");
  if (value.length < 3 || value.length > 54)
    return callback(false, "Name should be between 3 and 40 characters");

  if (!validateName(value))
    return callback(false, "Name must be alphabet only");

  return callback(true);
};

const phoneRules = (value, callback) => {
  if (!value) return callback(false, "Phone number is required");
  if (!numeric(value)) return callback(false, "Only numbers allowed");
  if (value.length < 5 || value.length > 15)
    return callback(false, "Invalid phone number");
  $.post("/api/check-phone", {
    code: $("#code select").find(":selected").val().split(",,,")[0],
    phone: $("#phone input").val(),
    _csrf: $("#csrf").val(),
  }).then((res) => {
    return callback(res.success, res.message);
  });
};

const emailRules = (value, callback) => {
  if (!value) return callback(false, "Email is required");
  if (!validateEmail(value)) return callback(false, "Please use a valid email");
  $.post("/api/check-email", {
    email: $("#email input").val(),
    _csrf: $("#csrf").val(),
  }).then((res) => {
    return callback(res.success, res.message);
  });
};

const passRules = (value, callback) => {
  if (!value) return callback(false, "Password is required");
  if (value.length < 6 || value.length > 30)
    return callback(false, "Password should be between 6 and 30 characters");
  return callback(true);
};

const cpassRules = (value, callback) => {
  if (!value) return callback(false, "This field can't be empty");
  if (value !== inputPassword.value)
    return callback(false, "Password does not match");
  return callback(true);
};

const termsRules = (value, callback) => {
  if (!value) return callback(false, "Please accept our terms to continue");
  return callback(true);
};

const signupBtn = new Button({
  elementId: "submitBtn",
  stores: [
    inputName,
    inputPhone,
    inputEmail,
    inputPassword,
    inputConfirmPassword,
    inputTerms,
  ],
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

new Input({
  parentId: "name",
  store: inputName,
  button: signupBtn,
  checkTime: 1,
  rules: nameRules,
  format: inputFormat,
});

new Input({
  parentId: "phone",
  store: inputPhone,
  button: signupBtn,
  rules: phoneRules,
  format: inputFormat,
  loading: inputLoading,
});

new Input({
  parentId: "email",
  store: inputEmail,
  button: signupBtn,
  rules: emailRules,
  format: inputFormat,
  loading: inputLoading,
});

const confirmPassword = new Input({
  parentId: "cpass",
  store: inputConfirmPassword,
  button: signupBtn,
  checkTime: 1,
  rules: cpassRules,
  format: inputFormat,
});

new Input({
  parentId: "pass",
  store: inputPassword,
  dependance: [confirmPassword],
  button: signupBtn,
  checkTime: 1,
  rules: passRules,
  format: inputFormat,
});

new Checkbox({
  parentId: "terms",
  store: inputTerms,
  button: signupBtn,
  rules: termsRules,
  format: checkboxFormat,
});
