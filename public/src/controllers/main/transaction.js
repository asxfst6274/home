import { formatDate, dollar } from "../../helpers.js";

$(".nav-transaction").addClass("active");

$(".transactionObj").on("click", (e) => {
  const transaction = JSON.parse(
    e.target.closest(".transactionObj").dataset.obj
  );

  if (transaction.status === "ongoing") {
    $("#transStatus").html(
      `<span class="badge bg-warning ms-2">${transaction.status}</span>`
    );
  } else if (transaction.status === "cancelled") {
    $("#transStatus").html(`<span class="badge bg-danger ms-2">Failed</span>`);
  } else {
    $("#transStatus").html(
      `<span class="badge bg-success ms-2">Success</span>`
    );
  }

  $("#transDate").text(formatDate(transaction.created_at));
  $("#transName").text(transaction.name);
  $("#transType").text(transaction.type);
  $("#transAmount").text(
    dollar(
      transaction.move === "credit" ? transaction.amount : -transaction.amount
    )
  );

  if (transaction.move === "credit") {
    $("#cUser").text("To");
    $("#sUser").text("From");
    $("#transAmount").removeClass("text-danger");
  } else {
    $("#sUser").text("To");
    $("#cUser").text("From");
    $("#transAmount").addClass("text-danger");
  }
  showModal("transactionDetails");
});
