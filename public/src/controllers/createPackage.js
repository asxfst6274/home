import Button from "../views/form/button.js";
import Checkbox from "../views/form/checkbox.js";
import Input from "../views/form/input.js";
import { inputFormat, inputLoading } from "../views/form/default.js";
import { alphaNumericSpace, numeric } from "../helpers.js";
// import config from "../config.js";

const inputTitle = { value: "", valid: false };
const inputMin = { value: "", valid: false };
const inputMax = { value: "", valid: false };
const inputReturn = { value: "", valid: false };
const inputFee = { value: "", valid: false };
const inputDuration = { value: "", valid: false };
const inputDescription = { value: "", valid: false };

const submitOnEntry = (isValid, e) => {
  if (!isValid) return;
  console.log("success Entry");
};

const submitOnClick = async (isValid, e) => {
  if (!isValid) return;

  $("form").trigger("submit");
};

const titleRules = (value, callback) => {
  if (!value) return callback(false, "Title is required");
  if (value.length > 30)
    return callback(false, "Title should be greater than 30 characters");

  return callback(true, "Confirm");
};

const minRules = (value, callback) => {
  if (!value) return callback(false, "Min amount is required");

  if (!numeric(value)) return callback(false, "Numbers only");

  if (value <= 0) return callback(false, "Min amount must be greater than 0");

  return callback(true, "Confirm");
};

const maxRules = (value, callback) => {
  if (!value) return callback(false, "Max amount is required");

  if (!numeric(value)) return callback(false, "Numbers only");

  if (value <= 0) return callback(false, "Max amount must be greater than 0");

  if (+value < +$("#min input").val())
    return callback(
      false,
      "Max amount should be greater or equal to min Amount"
    );

  return callback(true, "Confirm");
};

const returnRules = (value, callback) => {
  if (!value) return callback(false, "Investment returns is required");

  if (!numeric(value)) return callback(false, "Numbers only");

  if (value <= 0) return callback(false, "Returns must be greater than 0");

  return callback(true, "Confirm");
};

const feeRules = (value, callback) => {
  if (!value) return callback(false, "Investment Fee is required");

  if (!numeric(value)) return callback(false, "Numbers only");

  return callback(true, "Confirm");
};

const durationRules = (value, callback) => {
  if (!value) return callback(false, "Duration is required");

  if (!numeric(value)) return callback(false, "Numbers only");

  if (value <= 0) return callback(false, "Duration must be greater than 0");

  return callback(true, "Confirm");
};

const descriptionRules = (value, callback) => {
  if (!value) return callback(false, "Description is required");

  if (value.length < 10 || value.length > 50)
    return callback(
      false,
      "Description should be between 10 and 50 characters"
    );

  return callback(true, "Confirm");
};

const savePackageBtn = new Button({
  elementId: "savePackage",
  stores: [
    inputTitle,
    inputMin,
    inputMax,
    inputFee,
    inputReturn,
    inputDuration,
    inputDescription,
  ],
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

new Input({
  parentId: "title",
  store: inputTitle,
  button: savePackageBtn,
  rules: titleRules,
  format: inputFormat,
  loading: inputLoading,
});
const maxInput = new Input({
  parentId: "max",
  store: inputMax,
  button: savePackageBtn,
  rules: maxRules,
  format: inputFormat,
  loading: inputLoading,
});
new Input({
  parentId: "min",
  store: inputMin,
  button: savePackageBtn,
  dependance: [maxInput],
  rules: minRules,
  format: inputFormat,
  loading: inputLoading,
});
new Input({
  parentId: "return",
  store: inputReturn,
  button: savePackageBtn,
  rules: returnRules,
  format: inputFormat,
  loading: inputLoading,
});
new Input({
  parentId: "fee",
  store: inputFee,
  button: savePackageBtn,
  rules: feeRules,
  format: inputFormat,
  loading: inputLoading,
});
new Input({
  parentId: "duration",
  store: inputDuration,
  button: savePackageBtn,
  rules: durationRules,
  format: inputFormat,
  loading: inputLoading,
});
new Input({
  parentId: "description",
  store: inputDescription,
  button: savePackageBtn,
  rules: descriptionRules,
  format: inputFormat,
  loading: inputLoading,
});
