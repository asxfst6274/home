import Button from "../../views/form/button.js";
import Input from "../../views/form/input.js";
import { inputFormat, resetInputFormat } from "../../views/form/default.js";
import { dollar, numeric } from "../../helpers.js";
import Select from "../../views/form/select.js";

const inputDeposit = { value: "", valid: true };
const inputAmount = { value: "", valid: false };

// copy
$(".copy-address").on("click", () => {
  const input = document.getElementById("coin-address");
  input.disabled = false;
  input.select();
  document.execCommand("copy");
  input.disabled = true;
});

$(".nav-deposit").addClass("active");

const resetInputs = () => {
  amount.reset();
};

const updateUI = (value) => {
  $(".optionalInput").addClass("d-none");
  switch (value) {
    case "crypto":
      $(".cryptoInput").removeClass("d-none");
      break;
    case "bank":
      $(".bankInput").removeClass("d-none");
      break;
    default:
      alert("Invalid Deposit Mode");
  }
};

const depositMode = $("#depositMode").find(":selected").val();

updateUI(depositMode);

const submitOnEntry = (isValid, e, btn) => {};

const submitOnClick = async (isValid, e, btn) => {
  resetInputs();
  btn.update();
  if (!isValid) return;
  const selected = $("#coin").find(":selected").val().split(",,,");

  const coin = selected[0];
  const wallet = selected[1];
  const coinId = selected[2];
  const network = selected[3];
  const amount = $("#amount input").val();

  $(".coin").text(coin);
  $(".amount").text(dollar(amount));

  $(".amount").val(amount);
  $(".network").val(network);
  $(".coinId").val(coinId);
  $("#coin-address").val(wallet);

  showModal("cryptoDeposit");
};

const depositRules = (value) => {
  $("#amount input").val("");

  resetInputs();
  updateUI(value);
};

const amountRules = (value, callback) => {
  if (!value) return callback(false, "Amount is required");
  if (!numeric(value)) return callback(false, "Invalid amount");
  if (+value <= 0) return callback(false, "Invalid amount");

  return callback(true, "Confirm");
};

const submitBtn = new Button({
  elementId: "submitBtn",
  stores: [inputAmount],
  checkTime: 1,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

new Select({
  parentId: "deposit",
  store: inputDeposit,
  rules: depositRules,
  format: inputFormat,
});

const amount = new Input({
  parentId: "amount",
  store: inputAmount,
  button: submitBtn,
  rules: amountRules,
  format: inputFormat,
  reset: resetInputFormat,
});

$("#coin").on("change", () => {
  const selected = $("#coin").find(":selected").val().split(",,,");

  const network = selected[3];
  $(".network").val(network);
});

$("#coin").trigger("change");
