import Button from "../../views/form/button.js";
import Input from "../../views/form/input.js";
import { inputFormat } from "../../views/form/default.js";

const inputPassword = { value: "", valid: false };
const inputConfirmPassword = { value: "", valid: false };

const submitOnEntry = (isValid, e) => {};

const submitOnClick = async (isValid, e) => {
  if (!isValid) return;
  //   $("form").trigger("submit");
  document.getElementById("myForm").submit();
};

const passRules = (value, callback) => {
  if (!value) return callback(false, "Password is required");
  if (value.length < 6 || value.length > 20)
    return callback(false, "Password should be between 6 and 20 characters");
  return callback(true);
};

const cpassRules = (value, callback) => {
  if (!value) return callback(false, "This field can't be empty");
  if (value !== inputPassword.value)
    return callback(false, "Password does not match");
  return callback(true);
};

const signupBtn = new Button({
  elementId: "submitBtn",
  stores: [inputPassword, inputConfirmPassword],
  onEntry: submitOnEntry,
  onClick: submitOnClick,
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
