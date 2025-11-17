import Button from "../../views/form/button.js";
import Input from "../../views/form/input.js";
import { inputFormat, inputLoading } from "../../views/form/default.js";
import { numeric, validateEmail } from "../../helpers.js";
import Select from "../../views/form/select.js";

const inputEmail = { value: "", valid: false };
const inputPhone = { value: "", valid: false };
const inputStreet = { value: "", valid: false };
const inputCity = { value: "", valid: false };
const inputState = { value: "", valid: false };
const inputPass = { value: "", valid: false };
const inputNPass = { value: "", valid: false };
const inputCPass = { value: "", valid: false };

$(".nav-settings").addClass("active");
previewImage("#upThumb", "#imagePreview");

const submitOnEntry = (isValid, e, btn) => {};

const submitOnClick = async (isValid, e, btn) => {
  if (!isValid) return;
  const form = e.target.dataset.form;
  $(form).trigger("submit");
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

const phoneRules = (value, callback) => {
  if (!value) return callback(false, "Phone number is required");
  if (!numeric(value)) return callback(false, "Only numbers allowed");
  if (value.length < 5 || value.length > 15)
    return callback(false, "Invalid phone number");
  $.post("/api/check-phone", {
    code: $("#code select").find(":selected").val(),
    phone: $("#phone input").val(),
    _csrf: $("#csrf").val(),
  }).then((res) => {
    return callback(res.success, res.message);
  });
};

const passRules = async (value, callback) => {
  if (!value) return callback(false, "Password is required");
  if (value.length < 6 || value.length > 30)
    return callback(false, "Incorrect password");

  const pass = $("#pass input").val();
  const res = await $.get("/api/check-pass/" + pass);
  return callback(res.success, res.message);
};

const nPassRules = (value, callback) => {
  if (!value) return callback(false, "New password is required");
  if (value.length < 6 || value.length > 30)
    return callback(false, "Passowrd should be between 6 and 30 characters");

  return callback(true);
};

const cPassRules = (value, callback) => {
  if (!value) return callback(false, "This field can't be empty");
  if (value !== $("#nPass input").val())
    return callback(false, "Password does not match");
  return callback(true);
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

const emailBtn = new Button({
  elementId: "emailBtn",
  stores: [inputEmail],
  checkTime: 500,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const phoneBtn = new Button({
  elementId: "phoneBtn",
  stores: [inputPhone],
  checkTime: 500,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const addressBtn = new Button({
  elementId: "addressBtn",
  stores: [inputStreet, inputCity, inputState],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const passwordBtn = new Button({
  elementId: "passwordBtn",
  stores: [inputPass, inputNPass, inputCPass],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

new Input({
  parentId: "email",
  store: inputEmail,
  button: emailBtn,
  rules: emailRules,
  format: inputFormat,
  loading: inputLoading,
});

const phone = new Input({
  parentId: "phone",
  store: inputPhone,
  button: phoneBtn,
  rules: phoneRules,
  format: inputFormat,
  loading: inputLoading,
});

new Select({
  parentId: "code",
  dependance: [phone],
});

new Input({
  parentId: "street",
  store: inputStreet,
  button: addressBtn,
  rules: streetRules,
  format: inputFormat,
});

new Input({
  parentId: "city",
  store: inputCity,
  button: addressBtn,
  rules: cityRules,
  format: inputFormat,
});

new Input({
  parentId: "state",
  store: inputState,
  button: addressBtn,
  rules: stateRules,
  format: inputFormat,
});

new Input({
  parentId: "pass",
  store: inputPass,
  button: passwordBtn,
  checkTime: 200,
  rules: passRules,
  format: inputFormat,
  loading: inputLoading,
});

const cPass = new Input({
  parentId: "cPass",
  store: inputCPass,
  button: passwordBtn,
  rules: cPassRules,
  format: inputFormat,
});

new Input({
  parentId: "nPass",
  dependance: [cPass],
  store: inputNPass,
  checkTime: 500,
  button: passwordBtn,
  rules: nPassRules,
  format: inputFormat,
  loading: inputLoading,
});
