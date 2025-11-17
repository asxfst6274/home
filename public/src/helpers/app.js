"use strick";
const TIMES_DAY = 1000 * 60 * 60 * 24;
const TIMES_HOUR = 1000 * 60 * 60;
const TIMES_MINUTE = 1000 * 60;

function hideModal() {
  $(".hide-modal").trigger("click");
}

function toggleModal(id) {
  // hideModal();
  document.getElementById(id).querySelector(".toggle-modal").click();
}

function showSpinner() {
  $("#spinner").removeClass("d-none");
}

function hideSpinner() {
  $("#spinner").addClass("d-none");
}

function approveDepositHandler(e) {
  showSpinner();
  const id = e.target.id;
  const status = "approved";
  $.post("../php/controller.php", {
    action: "update_deposit",
    id: id,
    status: status,
  }).then((responce) => {
    // view("admin-deposit", "#deposit_table");
    location.reload();
  });
}

function cancelDepositHandler(e) {
  showSpinner();
  const id = e.target.id;
  const status = "canceled";

  $.post("../php/controller.php", {
    action: "update_deposit",
    id: id,
    status: status,
  }).then((responce) => {
    // view("admin-deposit", "#deposit_table");
    location.reload();
  });
}

function approveWithdrawalHandler(e) {
  showSpinner();
  const id = e.target.id;
  const status = "approved";

  $.post("../php/controller.php", {
    action: "update_withdrawal",
    id: id,
    status: status,
  }).then((responce) => {
    // view("admin-withdrawal", "#withdrawal_table");
    location.reload();
  });
}

function cancelWithdrawalHandler(e) {
  showSpinner();
  const id = e.target.id;
  const status = "canceled";

  $.post("../php/controller.php", {
    action: "update_withdrawal",
    id: id,
    status: status,
  }).then((responce) => {
    // view("admin-withdrawal", "#withdrawal_table");
    location.reload();
  });
}
