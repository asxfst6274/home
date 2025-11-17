import { formatDate, dollar } from "../../helpers.js";

$(".nav-loans").addClass("active");
$(".progress-card").on("click", (e) => {
  const card = e.target.closest(".progress-card");
  const id = card.dataset.id;
  const title = card.dataset.title;
  const target = card.dataset.target;
  const interest = card.dataset.interest;
  const amount = card.dataset.amount;
  const paid = card.dataset.paid;
  const progress = card.dataset.progress;
  const status = card.dataset.status;
  const date = card.dataset.date;

  if (status === "approved") {
    $(".loanId").val(id);

    $("#loanProgress").attr("data-note", progress);
    $("#loanTitle").text(title);
    $("#loanPaid").text(paid);
    $("#loanPaid").attr("class", `tw-text-blue-600`);
    $("#circle").attr(
      "class",
      `circle-progress circle-progress-fill tw-stroke-blue-600`
    );
    $("#loanTarget").text(target);

    initCircularProgress();

    showModal("loan-details");
  } else {
    if (status === "pending") {
      $("#loanStatus").html(`<span class="badge bg-info ms-2">Pending</span>`);
    } else if (status === "denied") {
      $("#loanStatus").html(`<span class="badge bg-danger ms-2">Denied</span>`);
    } else {
      $("#loanStatus").html(
        `<span class="badge bg-warning ms-2">Settled</span>`
      );
    }

    $("#loanDate").text(formatDate(date));
    $("#loanTitle").text(title);
    $("#loanAmount").text(amount);
    $("#loanInterest").text(interest);
    $(".loanPaid").text(paid);

    showModal("loanDetails");
  }
});
