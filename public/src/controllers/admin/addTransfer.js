import Button from "../../views/form/button.js";
import Checkbox from "../../views/form/checkbox.js";
import Input from "../../views/form/input.js";
import {
  inputFormat,
  checkboxFormat,
  inputLoading,
  resetInputFormat,
} from "../../views/form/default.js";
import { dollar, numeric, validateEmail, validateName } from "../../helpers.js";
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
const inputreceiver = { value: "", valid: false };
const inputSender = { value: "", valid: false };
const inputCotCode = { value: "", valid: false };

$(".nav-transfer").addClass("active");

const resetInputs = () => {
  sender.reset();
  receiver.reset();
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
  $(".optionalInput").addClass("hidden");
  switch (value) {
    case "same":
      $(".sameInput").removeClass("hidden");
      break;
    case "others":
      $(".othersInput").removeClass("hidden");
      break;
    case "crypto":
      $(".cryptoInput").removeClass("hidden");
      break;
    case "paypal":
      $(".paypalInput").removeClass("hidden");
      break;
    case "cashApp":
      $(".cashAppInput").removeClass("hidden");
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
  e.target.type = "submit";
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
  $("#amount input").val("");

  resetInputs();
  updateUI(value);
};

const nameRules = (value, callback) => {
  if (!value) return callback(false, "receiver name is required");
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

  return callback(true, "Confirm");
};

const coinRules = (value, callback) => {
  if (!value) return callback(false, "crypto coin is required");

  return callback(true);
};

const paypalEmailRules = async (value, callback) => {
  if (!value) return callback(false, "receiver's paypal email is required");
  if (!validateEmail(value)) return callback(false, "Please use a valid email");

  return callback(true);
};

const cashAppUsernameRules = async (value, callback) => {
  if (!value) return callback(false, "receiver's cashApp username is required");

  return callback(true);
};

const walletRules = async (value, callback) => {
  if (!value) return callback(false, "receiver's wallet address is required");

  return callback(true);
};

const bankRules = (value, callback) => {
  if (!value) return callback(false, "receiver's bank name is required");

  return callback(true);
};

const cotCodeRules = async (value, callback) => {
  if (!value) return callback(false, "Code required");
  if (!numeric(value)) return callback(false, "Invalid Code");

  const code = $("#cotCode input").val();

  const res = await $.get("/api/transfer/cot/" + code);

  return callback(res.success, res.message);
};

const acNumberRules = async (value, callback) => {
  $("#name input").prop("disabled", false);
  if (!value) return callback(false, "receiver's account number is required");
  if (!numeric(value)) return callback(false, "Invalid account number");

  if (value.length < 7 || value.length > 22)
    return callback(false, "Invalid account number");

  return callback(true);
};

const routingRules = (value, callback) => {
  if (!value)
    return callback(false, "receiver bank's routing number is required");
  if (!numeric(value)) return callback(false, "Invalid routing number");

  return callback(true);
};

const receiverRules = (value, callback) => {
  if (value === $("#sender select").find(":selected").val())
    return callback(false, "Sender and receiver can not be thesame");

  return callback(true);
};

const senderRules = (value, callback, ele) => {
  const balance = ele.querySelector("option").dataset.balance;
  if (+balance < +$("#amount input").val())
    return callback(
      false,
      `Sender those not have enough balance (Avaliable: ${dollar(balance)})`
    );

  return callback(true);
};

const sameBtn = new Button({
  elementId: "sameBtn",
  stores: [inputAmount, inputSender, inputreceiver],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const otherBtn = new Button({
  elementId: "otherBtn",
  stores: [
    inputName,
    inputAmount,
    inputSender,
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
  stores: [inputName, inputAmount, inputSender, inputCoin, inputWallet],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const paypalBtn = new Button({
  elementId: "paypalBtn",
  stores: [inputName, inputAmount, inputSender, inputPaypalEmail],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

const cashAppBtn = new Button({
  elementId: "cashAppBtn",
  stores: [inputName, inputAmount, inputSender, inputCashAppUsername],
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

const receiver = new Select({
  parentId: "receiver",
  store: inputreceiver,
  button: sameBtn,
  checkTime: 1,
  rules: receiverRules,
  format: inputFormat,
  reset: resetInputFormat,
});

const sender = new Select({
  parentId: "sender",
  dependance: [receiver, true],
  store: inputSender,
  button: sameBtn,
  checkTime: 1,
  rules: senderRules,
  format: inputFormat,
  reset: resetInputFormat,
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
  button: [otherBtn],
  loading: inputLoading,
  rules: acNumberRules,
  format: inputFormat,
  reset: resetInputFormat,
});

const name = new Input({
  parentId: "name",
  store: inputName,
  checkTime: 1,
  button: [otherBtn, cryptoBtn, paypalBtn, cashAppBtn],
  rules: nameRules,
  format: inputFormat,
  reset: resetInputFormat,
});

const amount = new Input({
  parentId: "amount",
  store: inputAmount,
  dependance: [sender, true],
  button: [sameBtn, otherBtn, cryptoBtn, paypalBtn, cashAppBtn],
  checkTime: 1,
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
