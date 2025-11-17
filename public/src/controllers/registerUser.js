import Button from "../views/form/button.js";
import Input from "../views/form/input.js";
import {
  inputFormat,
  inputLoading,
} from "../views/form/default.js";
import { validateEmail, validateName, validateUsername } from "../helpers.js";
// import config from "../config.js";

const inputName = { value: "", valid: false };
const inputUsername = { value: "", valid: false };
const inputEmail = { value: "", valid: false };
const inputPassword = { value: "", valid: false };
const inputConfirmPassword = { value: "", valid: false };

const submitOnEntry = (isValid, e) => {
  if (!isValid) return;
  console.log("success Entry");
};

const submitOnClick = async (isValid, e) => {
  if (!isValid) return;
  $("#submit").prop("disabled", true);
  $("#submit").text("Loading...");
  const res = await $.post("/register-user", {
    name: $("#name input").val(),
    email: $("#email input").val(),
    username: $("#username input").val(),
    pass: $("#pass input").val(),
    cpass: $("#cpass input").val(),
    _csrf: $("#csrf").val(),
  });
  console.log(res);
  if (res.success) {
    window.location.replace("/users");
    // $("form").trigger("reset");
  } else {
    $("#submit").text("SIGNUP");
    $("#submit").prop("disabled", false);
  }
};

const nameRules = (value, callback) => {
  if (!value) return callback(false, "Name is required");
  if (value.length < 3 || value.length > 30)
    return callback(false, "Name should be between 3 and 30 characters");

  if (!validateName(value))
    return callback(false, "Name must be alphabet only");

  return callback(true, "Confirm");
};

const usernameRules = (value, callback) => {
  if (!value) return callback(false, "username is required");
  if (value.length < 3 || value.length > 15)
    return callback(false, "Username should be between 3 and 15 characters");

  if (!validateUsername(value))
    return callback(false, `Only Alphanumeric and '-','_' are accepted`);

  $.post("/check-username", {
    username: $("#username input").val(),
    _csrf: $("#csrf").val(),
  }).then((res) => {
    return callback(res.success, res.message);
  });
};

const emailRules = (value, callback) => {
  if (!value) return callback(false, "Email is required");
  if (!validateEmail(value)) return callback(false, "Please use a valid email");
  $.post("/check-email", {
    email: $("#email input").val(),
    _csrf: $("#csrf").val(),
  }).then((res) => {
    return callback(res.success, res.message);
  });
};

const passRules = (value, callback) => {
  if (!value) return callback(false, "Password is required");
  if (value.length < 6 || value.length > 20)
    return callback(false, "Password should be between 6 and 20 characters");
  return callback(true, "Strong");
};

const cpassRules = (value, callback) => {
  if (!value) return callback(false, "This field can't be empty");
  if (value !== inputPassword.value)
    return callback(false, "Password does not match");
  return callback(true, "Confirm");
};

const signupBtn = new Button({
  elementId: "submit",
  stores: [
    inputName,
    inputUsername,
    inputEmail,
    inputPassword,
    inputConfirmPassword,
  ],
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

new Input({
  parentId: "name",
  store: inputName,
  button: signupBtn,
  rules: nameRules,
  format: inputFormat,
  loading: inputLoading,
});

new Input({
  parentId: "username",
  store: inputUsername,
  button: signupBtn,
  rules: usernameRules,
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
  rules: cpassRules,
  format: inputFormat,
  loading: inputLoading,
});

new Input({
  parentId: "pass",
  store: inputPassword,
  dependance: [confirmPassword],
  button: signupBtn,
  rules: passRules,
  format: inputFormat,
  loading: inputLoading,
});
