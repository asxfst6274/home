import Button from "../views/form/button.js";
import Input from "../views/form/input.js";
import { inputFormat, inputLoading } from "../views/form/default.js";
import {
  numeric,
  validateEmail,
  validateName,
  validateUsername,
} from "../helpers.js";
// import config from "../config.js";

const inputName = { value: "", valid: false };
const inputUsername = { value: "", valid: false };
const inputEmail = { value: "", valid: false };
const inputPassword = { value: "", valid: false };
const inputConfirmPassword = { value: "", valid: false };
const inputPin1 = { value: "", valid: false };
const inputPin2 = { value: "", valid: false };
const inputPin3 = { value: "", valid: false };
const inputPin4 = { value: "", valid: false };

// SAVE PROFILE

const saveProfileOnEntry = (isValid, e) => {
  if (!isValid) return;
  console.log("success Entry");
};

const saveProfileOnClick = async (isValid, e) => {
  if (!isValid) return;
  $("#save-profile-btn").prop("disabled", true);
  $("#save-profile-btn").text("Loading...");
  const res = await $.post("/edit-user-profile", {
    userId: $("#userId").val(),
    name: $("#name input").val(),
    email: $("#email input").val(),
    username: $("#username input").val(),
    _csrf: $("#csrf").val(),
  });
  console.log(res);
  let notice;
  if (res.success) {
    notice = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        ${res.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
  } else {
    notice = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${res.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
  }

  $("#edit-profile-notice").html(notice);
  $("#save-profile-btn").text("SAVE");
  $("#save-profile-btn").prop("disabled", false);
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
    userId: $("#userId").val(),
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
    userId: $("#userId").val(),
    _csrf: $("#csrf").val(),
  }).then((res) => {
    return callback(res.success, res.message);
  });
};

const saveProfileBtn = new Button({
  elementId: "save-profile-btn",
  stores: [inputName, inputUsername, inputEmail],
  onEntry: saveProfileOnEntry,
  onClick: saveProfileOnClick,
});

new Input({
  parentId: "name",
  store: inputName,
  button: saveProfileBtn,
  rules: nameRules,
  format: inputFormat,
  loading: inputLoading,
});

new Input({
  parentId: "username",
  store: inputUsername,
  button: saveProfileBtn,
  rules: usernameRules,
  format: inputFormat,
  loading: inputLoading,
});

new Input({
  parentId: "email",
  store: inputEmail,
  button: saveProfileBtn,
  rules: emailRules,
  format: inputFormat,
  loading: inputLoading,
});

// SAVE CODE

const saveCodeOnEntry = (isValid, e) => {
  if (!isValid) return;
  console.log("success Entry");
};

const saveCodeOnClick = async (isValid, e) => {
  if (!isValid) return;
  $("#save-code-btn").prop("disabled", true);
  $("#save-code-btn").text("Loading...");
  const res = await $.post("/edit-user-code", {
    pin1: $("#pin1 input").val(),
    pin2: $("#pin2 input").val(),
    pin3: $("#pin3 input").val(),
    pin4: $("#pin4 input").val(),
    userId: $("#userId").val(),
    _csrf: $("#csrf").val(),
  });
  console.log(res);
  let notice;
  if (res.success) {
    notice = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            ${res.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
  } else {
    notice = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${res.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
  }

  $("#edit-code-notice").html(notice);
  $("#save-code-btn").text("SAVE");
  $("#save-code-btn").prop("disabled", false);
};

const pinRules = (value, callback) => {
  if (!value) return callback(false, "Can't be empty");
  if (!numeric(value)) return callback(false, "Numbers Only");
  return callback(true, "Ok");
};

const saveCodeBtn = new Button({
  elementId: "save-code-btn",
  stores: [inputPin1, inputPin2, inputPin3, inputPin4],
  checkTime: 1,
  onEntry: saveCodeOnEntry,
  onClick: saveCodeOnClick,
});

new Input({
  parentId: "pin1",
  store: inputPin1,
  button: saveCodeBtn,
  rules: pinRules,
  format: inputFormat,
});

new Input({
  parentId: "pin2",
  store: inputPin2,
  button: saveCodeBtn,
  rules: pinRules,
  format: inputFormat,
});

new Input({
  parentId: "pin3",
  store: inputPin3,
  button: saveCodeBtn,
  rules: pinRules,
  format: inputFormat,
});

new Input({
  parentId: "pin4",
  store: inputPin4,
  button: saveCodeBtn,
  rules: pinRules,
  format: inputFormat,
});

// SAVE PASSWORD

const savePasswordOnEntry = (isValid, e) => {
  if (!isValid) return;
  console.log("success Entry");
};

const savePasswordOnClick = async (isValid, e) => {
  if (!isValid) return;
  $("#save-password-btn").prop("disabled", true);
  $("#save-password-btn").text("Loading...");
  const res = await $.post("/edit-user-password", {
    pass: $("#pass input").val(),
    cpass: $("#cpass input").val(),
    userId: $("#userId").val(),
    _csrf: $("#csrf").val(),
  });
  console.log(res);
  let notice;
  if (res.success) {
    notice = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            ${res.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
  } else {
    notice = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${res.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
  }

  $("#edit-password-notice").html(notice);
  $("#save-password-btn").text("SAVE");
  $("#save-password-btn").prop("disabled", false);
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

const savePasswordBtn = new Button({
  elementId: "save-password-btn",
  stores: [inputPassword, inputConfirmPassword],
  checkTime: 1,
  onEntry: savePasswordOnEntry,
  onClick: savePasswordOnClick,
});

const confirmPassword = new Input({
  parentId: "cpass",
  store: inputConfirmPassword,
  button: savePasswordBtn,
  rules: cpassRules,
  format: inputFormat,
});

new Input({
  parentId: "pass",
  store: inputPassword,
  dependance: [confirmPassword],
  button: savePasswordBtn,
  rules: passRules,
  format: inputFormat,
});
