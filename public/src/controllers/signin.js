import Button from "../views/form/button.js";
import Input from "../views/form/input.js";

// import config from "../config.js";

const inputUsername = { value: "", valid: false };
const inputPassword = { value: "", valid: false };

const login = () => {
  $("#submit").prop("disabled", true);
  return $.post("/login", {
    username: $("#username input").val(),
    pass: $("#pass input").val(),
    _csrf: $("#csrf").val(),
  }).then((res) => {
    console.log(res);
    if (res.success) {
      $("#submit").text("Logging In...");
      window.location.replace(res.lastPath ? res.lastPath : "/");
    } else {
      $("#submit").prop("disabled", false);
    }
    return res;
  });
};

const submitOnEntry = (isValid, e) => {
  $("#errorMessage").text(``);
  if (!isValid) return;
  login();
};

const submitOnClick = (isValid, e) => {
  //   e.preventDefault();
  if (!isValid) return $("#errorMessage").text(`Invalid Email or Password`);
  $("#submit").text("Logging In...");
  login().then((res) => {
    if (res.success) return;
    $("#submit").text("LOGIN");
    $("#errorMessage").text(`${res.message}`);
  });
};

const usernameRules = (value, callback) => {
  if (!value) return callback(false);
  if (value.length < 3 || value.length > 30) return callback(false);
  return callback(true);
};

const passRules = (value, callback) => {
  if (!value) return callback(false);
  if (value.length < 6 || value.length > 20) return callback(false);
  return callback(true);
};

const signupBtn = new Button({
  elementId: "submit",
  stores: [inputUsername, inputPassword],
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const password = new Input({
  parentId: "pass",
  store: inputPassword,
  button: signupBtn,
  checkTime: 200,
  rules: passRules,
});

new Input({
  parentId: "username",
  store: inputUsername,
  dependance: [password],
  button: signupBtn,
  rules: usernameRules,
});
