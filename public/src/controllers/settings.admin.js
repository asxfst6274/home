"use strict";

$(".depositMethodAddress").on("click", async (e) => {
  const id = e.target.dataset.id;
  const name = e.target.dataset.name;
  const wallet = e.target.dataset.wallet;

  $("#walletAddress input").val(wallet);
  $("#depositMethodName").text(name);
  $("#methodId").val(id);

  toggleModal("deposit-method-modal");
});
