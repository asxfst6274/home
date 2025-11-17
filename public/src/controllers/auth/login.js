import { errorMessage } from "../../helpers.js";
import Button from "../../views/form/button.js";
import Input from "../../views/form/input.js";

const inputAccount = { value: "", valid: false };
const inputPassword = { value: "", valid: false };

const login = () => {
  $("#submitBtn").prop("disabled", true);
  return $.post("/api/login", {
    account: $("#account input").val().toLowerCase(),
    pass: $("#pass input").val(),
    _csrf: $("#csrf").val(),
  }).then((res) => {
    // console.log(res);
    if (res.success) {
      $("#submitBtn").text("Logging In...");
      window.location.replace(res.lastPath ? res.lastPath : "/");
    } else {
      $("#submitBtn").prop("disabled", false);
    }
    return res;
  });
};

const submitOnEntry = (isValid, e) => {
  // $("#errorMessage").html(``);
  // if (!isValid) return;
  // login();
};

const submitOnClick = (isValid, e) => {
  $("#submitBtn").text("Loading...");
  $("#errorMessage").html(``);
  if (!isValid) {
    $("#submitBtn").text("Sign in");
    return $("#errorMessage").html(errorMessage("Invalid email or password"));
  }
  login().then((res) => {
    if (res.success) return;
    $("#submitBtn").text("Sign in");
    $("#errorMessage").html(errorMessage(res.message));
  });
};

const accountRules = (value, callback) => {
  if (!value) return callback(false);
  // if (value.length < 5 || value.length > 30) return callback(false);
  return callback(true);
};

const passRules = (value, callback) => {
  if (!value) return callback(false);
  // if (value.length < 6 || value.length > 30) return callback(false);
  return callback(true);
};

const signupBtn = new Button({
  elementId: "submitBtn",
  stores: [inputAccount, inputPassword],
  checkTime: 200,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

new Input({
  parentId: "pass",
  store: inputPassword,
  button: signupBtn,
  rules: passRules,
});

new Input({
  parentId: "account",
  store: inputAccount,
  button: signupBtn,
  rules: accountRules,
});
