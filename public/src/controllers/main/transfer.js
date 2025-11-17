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
const inputAmount = { value: "", valid: false };
const inputCotCode = { value: "", valid: false };

$(".nav-transfer").addClass("active");

const resetInputs = () => {
  name.reset();
  bank.reset();
  routing.reset();
  acNumber.reset();
  paypalEmail.reset();
  cashAppUsername.reset();
  coin.reset();
  wallet.reset();
  amount.reset();
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
  if (!$("#isVerifield").val()) return showModal("noticeModal");
  if (!$("#requireCot").val()) return $("form").trigger("submit");
  cotCode.reset();
  $("#cotCode input").val("");
  showModal("cotCodeModal");
};

const submitOnClick2 = async (isValid, e, btn) => {
  if (!isValid) return;
  $("#name input").prop("disabled", false);
  const cotCode = $("#cotCode input").val();
  $("#myCotCode").val(cotCode);
  $("form").trigger("submit");
  // console.log($("#name input").val());
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
  $("#amount input").val("");

  resetInputs();
  updateUI(value);
};

const nameRules = (value, callback) => {
  if (!value) return callback(false, "Receiver name is required");
  if (value.length < 3 || value.length > 30)
    return callback(false, "Name should be between 3 and 30 characters");

  if (!validateName(value))
    return callback(false, "Name must be alphabet only");

  return callback(true, "Confirm");
};

const amountRules = (value, callback) => {
  if (!value) return callback(false, "Amount is required");
  if (!numeric(value)) return callback(false, "Invalid amount");
  if (+value <= 0) return callback(false, "Invalid amount");

  const balance = $("#myBalance").val();
  if (+value > balance) return callback(false, "Insufficient balance");
  return callback(true, "Confirm");
};

const coinRules = (value, callback) => {
  if (!value) return callback(false, "crypto coin is required");

  return callback(true);
};

const paypalEmailRules = async (value, callback) => {
  if (!value) return callback(false, "Receiver's paypal email is required");
  if (!validateEmail(value)) return callback(false, "Please use a valid email");

  return callback(true);
};

const cashAppUsernameRules = async (value, callback) => {
  if (!value) return callback(false, "Receiver's cashApp username is required");

  return callback(true);
};

const walletRules = async (value, callback) => {
  if (!value) return callback(false, "Receiver's wallet address is required");

  return callback(true);
};

const bankRules = (value, callback) => {
  if (!value) return callback(false, "Receiver's bank name is required");

  return callback(true);
};

const cotCodeRules = async (value, callback) => {
  if (!value) return callback(false, "Code required");
  // if (!numeric(value)) return callback(false, "Invalid Code");

  const code = $("#cotCode input").val();

  const res = await $.get("/api/transfer/cot/" + code);

  return callback(res.success, res.message);
};

const acNumberRules = async (value, callback) => {
  $("#name input").prop("disabled", false);
  if (!value) return callback(false, "Receiver's account number is required");
  if (!numeric(value)) return callback(false, "Invalid account number");

  if (value.length < 7 || value.length > 22)
    return callback(false, "Invalid account number");

  const accountMode = $("#accountMode").find(":selected").val();

  const accountNumber = $("#acNumber input").val();

  if (accountMode === "same") {
    const res = await $.get(`/api/transfer/user/${accountNumber}`);

    $("#name input").val("");
    if (!res.success) return callback(res.success, res.message);

    $("#name input").val(res.data.name);
    $("#name input").prop("disabled", true);

    name.reset();
    return callback(res.success, res.message);
  }

  return callback(true);
};

const routingRules = (value, callback) => {
  if (!value) return callback(false, "Routing number / Swift Code is required");

  return callback(true);
};

const sameBtn = new Button({
  elementId: "sameBtn",
  stores: [inputName, inputAmount, ["acNumber", inputAcNumber]],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const otherBtn = new Button({
  elementId: "otherBtn",
  stores: [
    inputName,
    inputAmount,
    ["acNumber", inputAcNumber],
    inputBank,
    inputRouting,
  ],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const cryptoBtn = new Button({
  elementId: "cryptoBtn",
  stores: [inputName, inputAmount, inputCoin, inputWallet],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const paypalBtn = new Button({
  elementId: "paypalBtn",
  stores: [inputName, inputAmount, inputPaypalEmail],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const cashAppBtn = new Button({
  elementId: "cashAppBtn",
  stores: [inputName, inputAmount, inputCashAppUsername],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const cotCodeBtn = new Button({
  elementId: "cotCodeBtn",
  stores: [inputCotCode],
  checkTime: 500,
  onClick: submitOnClick2,
});

const cotCode = new Input({
  parentId: "cotCode",
  store: inputCotCode,
  button: cotCodeBtn,
  rules: cotCodeRules,
  loading: inputLoading,
  format: inputFormat,
  reset: resetInputFormat,
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

const amount = new Input({
  parentId: "amount",
  store: inputAmount,
  button: [sameBtn, otherBtn, cryptoBtn, paypalBtn, cashAppBtn],
  rules: amountRules,
  format: inputFormat,
  reset: resetInputFormat,
});

const paypalEmail = new Input({
  parentId: "paypalEmail",
  store: inputPaypalEmail,
  button: paypalBtn,
  rules: paypalEmailRules,
  format: inputFormat,
  reset: resetInputFormat,
});

const cashAppUsername = new Input({
  parentId: "cashAppUsername",
  store: inputCashAppUsername,
  button: cashAppBtn,
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
  rules: walletRules,
  format: inputFormat,
  reset: resetInputFormat,
});
