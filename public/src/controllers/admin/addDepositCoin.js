import Button from "../../views/form/button.js";
import Input from "../../views/form/input.js";
import {
  inputFormat,
  checkboxFormat,
  inputLoading,
  resetInputFormat,
} from "../../views/form/default.js";
import { numeric, validateEmail, validateName } from "../../helpers.js";
import Select from "../../views/form/select.js";

const inputCoin = { value: "", valid: false };
const inputNetwork = { value: "", valid: false };
const inputWallet = { value: "", valid: false };

const submitOnEntry = (isValid, e, btn) => {};

const submitOnClick = async (isValid, e, btn) => {
  if (!isValid) return;
  $("form").trigger("submit");
};

const coinRules = async (value, callback) => {
  if (!value) return callback(false, "Coin is required");

  const res = await $.get(
    "/api/deposit-method/coin/" + value + "/" + $("#methodId").val()
  );

  return callback(res.success, res.message);
};

const networkRules = async (value, callback) => {
  if (!value) return callback(false, "Network is required");
  return callback(true);
};

const walletRules = async (value, callback) => {
  if (!value) return callback(false, "Wallet address is required");

  const res = await $.get(
    "/api/deposit-method/wallet/" + value + "/" + $("#methodId").val()
  );

  return callback(res.success, res.message);
};

const submitBtn = new Button({
  elementId: "submitBtn",
  stores: [inputCoin, inputWallet],
  checkTime: 200,
  onEntry: submitOnEntry,
  onClick: submitOnClick,
});

new Input({
  parentId: "network",
  store: inputNetwork,
  button: submitBtn,
  loading: inputLoading,
  rules: networkRules,
  format: inputFormat,
  reset: resetInputFormat,
});

new Input({
  parentId: "coin",
  store: inputCoin,
  button: submitBtn,
  loading: inputLoading,
  rules: coinRules,
  format: inputFormat,
  reset: resetInputFormat,
});

new Input({
  parentId: "network",
  store: inputNetwork,
  button: submitBtn,
  loading: inputLoading,
  rules: networkRules,
  format: inputFormat,
  reset: resetInputFormat,
});

new Input({
  parentId: "wallet",
  store: inputWallet,
  button: submitBtn,
  loading: inputLoading,
  rules: walletRules,
  format: inputFormat,
  reset: resetInputFormat,
});
