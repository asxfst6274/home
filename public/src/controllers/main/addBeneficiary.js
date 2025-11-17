import Button from "../../views/form/button.js";
import Checkbox from "../../views/form/checkbox.js";
import Input from "../../views/form/input.js";
import {
  inputFormat,
  checkboxFormat,
  inputLoading,
  resetInputFormat,
} from "../../views/form/default.js";
import { numeric, validateEmail, validateName } from "../../helpers.js";
import Select from "../../views/form/select.js";

const inputAccount = { value: "", valid: true };
const inputName = { value: "", valid: false };
const inputCoin = { value: "", valid: false };
const inputPaypalEmail = { value: "", valid: false };
const inputCashAppUsername = { value: "", valid: false };
const inputWallet = { value: "", valid: false };
const inputBank = { value: "", valid: false };
const inputAcNumber = { value: "", valid: false };
const inputRouting = { value: "", valid: false };
const originalProfile = $("#imagePreview").attr("src");

$(".nav-beneficiary").addClass("active");
previewImage("#upThumb", "#imagePreview");

const resetInputs = () => {
  name.reset();
  bank.reset();
  routing.reset();
  acNumber.reset();
  paypalEmail.reset();
  cashAppUsername.reset();
  coin.reset();
  wallet.reset();
};

const updateUI = (value) => {
  $(".optionalInput").addClass("d-none");
  switch (value) {
    case "same":
      $(".sameInput").removeClass("d-none");
      break;
    case "others":
      $(".othersInput").removeClass("d-none");
      break;
    case "crypto":
      $(".cryptoInput").removeClass("d-none");
      break;
    case "paypal":
      $(".paypalInput").removeClass("d-none");
      break;
    case "cashApp":
      $(".cashAppInput").removeClass("d-none");
      break;
    default:
      alert("Invalid Account Mode");
  }
};

const accountMode = $("#accountMode").find(":selected").val();

updateUI(accountMode);

const submitOnEntry = (isValid, e, btn) => {};

const submitOnClick = async (isValid, e, btn) => {
  resetInputs();
  btn.update();
  if (!isValid) return;
  $("form").trigger("submit");
};

const accountRules = (value) => {
  $("#name input").prop("disabled", false);
  $("#name input").val("");
  $("#bank input").val("");
  $("#routing input").val("");
  $("#acNumber input").val("");
  $("#paypalEmail input").val("");
  $("#cashAppUsername input").val("");
  $("#coin input").val("");
  $("#wallet input").val("");

  $("#upThumb").attr("type", "text");
  $("#upThumb").val("");
  $("#upThumb").attr("type", "file");

  $("#imagePreview").attr("src", originalProfile);

  resetInputs();
  updateUI(value);
};

const nameRules = (value, callback) => {
  if (!value) return callback(false, "Beneficiary name is required");
  if (value.length < 3 || value.length > 30)
    return callback(false, "Name should be between 3 and 30 characters");

  if (!validateName(value))
    return callback(false, "Name must be alphabet only");

  return callback(true, "Confirm");
};

const coinRules = (value, callback) => {
  if (!value) return callback(false, "crypto coin is required");

  return callback(true);
};

const paypalEmailRules = (value, callback) => {
  if (!value) return callback(false, "Beneficiary's paypal email is required");
  if (!validateEmail(value)) return callback(false, "Please use a valid email");

  $.post("/api/beneficiary/paypal-email", {
    paypalEmail: $("#paypalEmail input").val(),
    id: $("#beneficiaryId").val(),
    _csrf: $("#csrf").val(),
  }).then((res) => {
    return callback(res.success, res.message);
  });
};

const cashAppUsernameRules = (value, callback) => {
  if (!value)
    return callback(false, "Beneficiary's cashApp username is required");

  $.post("/api/beneficiary/cash-app-username", {
    cashAppUsername: $("#cashAppUsername input").val(),
    id: $("#beneficiaryId").val(),
    _csrf: $("#csrf").val(),
  }).then((res) => {
    return callback(res.success, res.message);
  });
};

const walletRules = (value, callback) => {
  if (!value)
    return callback(false, "Beneficiary's wallet address is required");

  $.post("/api/beneficiary/wallet", {
    wallet: $("#wallet input").val(),
    id: $("#beneficiaryId").val(),
    _csrf: $("#csrf").val(),
  }).then((res) => {
    return callback(res.success, res.message);
  });
};

const bankRules = (value, callback) => {
  if (!value) return callback(false, "Beneficiary's bank name is required");

  return callback(true);
};

const acNumberRules = async (value, callback) => {
  $("#name input").prop("disabled", false);
  if (!value)
    return callback(false, "Beneficiary's account number is required");
  if (!numeric(value)) return callback(false, "Invalid account number");

  if (value.length < 7 || value.length > 22)
    return callback(false, "Invalid account number");

  const res = await $.post("/api/beneficiary/account-number", {
    accountNumber: $("#acNumber input").val(),
    id: $("#beneficiaryId").val(),
    _csrf: $("#csrf").val(),
  });

  const accountMode = $("#accountMode").find(":selected").val();

  if (!res.success) return callback(res.success, res.message);

  const accountNumber = $("#acNumber input").val();

  if (accountMode === "same") $("#name input").val("");
  if (res.success && accountMode === "same") {
    const res = await $.get(`/api/beneficiary/user/${accountNumber}`);

    if (!res.success) return callback(res.success, res.message);

    const profile = res.data.profile;

    $("#name input").val(res.data.name);
    if (profile) {
      $("#imagePreview").attr("src", `/share/images/user/profile/${profile}`);
      $("#upThumb").attr("type", "text");
      $("#upThumb").val("");
      $("#upThumb").attr("type", "file");
    }

    $("#name input").prop("disabled", true);

    name.reset();
    return callback(res.success, res.message);
  }

  return callback(res.success, res.message);
};

const routingRules = (value, callback) => {
  if (!value)
    return callback(false, "Beneficiary bank's routing number is required");
  if (!numeric(value)) return callback(false, "Invalid routing number");

  return callback(true);
};

const sameBtn = new Button({
  elementId: "sameBtn",
  stores: [inputName, ["acNumber", inputAcNumber]],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const otherBtn = new Button({
  elementId: "otherBtn",
  stores: [inputName, ["acNumber", inputAcNumber], inputBank, inputRouting],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const cryptoBtn = new Button({
  elementId: "cryptoBtn",
  stores: [inputName, inputCoin, inputWallet],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const paypalBtn = new Button({
  elementId: "paypalBtn",
  stores: [inputName, inputPaypalEmail],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const cashAppBtn = new Button({
  elementId: "cashAppBtn",
  stores: [inputName, inputCashAppUsername],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

new Select({
  parentId: "account",
  store: inputAccount,
  rules: accountRules,
  format: inputFormat,
});

const bank = new Input({
  parentId: "bank",
  store: inputBank,
  button: otherBtn,
  rules: bankRules,
  format: inputFormat,
  reset: resetInputFormat,
});

const routing = new Input({
  parentId: "routing",
  store: inputRouting,
  button: otherBtn,
  rules: routingRules,
  format: inputFormat,
  reset: resetInputFormat,
});

const acNumber = new Input({
  parentId: "acNumber",
  store: inputAcNumber,
  button: [sameBtn, otherBtn],
  checkTime: 200,
  loading: inputLoading,
  rules: acNumberRules,
  format: inputFormat,
  reset: resetInputFormat,
});

const name = new Input({
  parentId: "name",
  store: inputName,
  button: [sameBtn, otherBtn, cryptoBtn, paypalBtn, cashAppBtn],
  rules: nameRules,
  format: inputFormat,
  reset: resetInputFormat,
});

const paypalEmail = new Input({
  parentId: "paypalEmail",
  store: inputPaypalEmail,
  button: paypalBtn,
  checkTime: 200,
  loading: inputLoading,
  rules: paypalEmailRules,
  format: inputFormat,
  reset: resetInputFormat,
});

const cashAppUsername = new Input({
  parentId: "cashAppUsername",
  store: inputCashAppUsername,
  button: cashAppBtn,
  checkTime: 200,
  loading: inputLoading,
  rules: cashAppUsernameRules,
  format: inputFormat,
  reset: resetInputFormat,
});

const coin = new Input({
  parentId: "coin",
  store: inputCoin,
  button: cryptoBtn,
  rules: coinRules,
  format: inputFormat,
  reset: resetInputFormat,
});

const wallet = new Input({
  parentId: "wallet",
  store: inputWallet,
  button: cryptoBtn,
  checkTime: 200,
  loading: inputLoading,
  rules: walletRules,
  format: inputFormat,
  reset: resetInputFormat,
});
