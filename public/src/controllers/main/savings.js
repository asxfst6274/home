$(".nav-save").addClass("active");
$(".progress-card").on("click", (e) => {
  const card = e.target.closest(".progress-card");
  const id = card.dataset.id;
  const title = card.dataset.title;
  const target = card.dataset.target;
  const saved = card.dataset.saved;
  const color = card.dataset.color;
  const category = card.dataset.category;
  const progress = card.dataset.progress;

  $(".savingsId").val(id);

  $("#progress").attr("data-note", progress);
  $("#title").text(title);
  $("#category").text(category);
  $("#saved").text(saved);
  $("#saved").attr("class", `tw-text-${color}-600`);
  $("#circle").attr(
    "class",
    `circle-progress circle-progress-fill tw-stroke-${color}-600`
  );
  $("#target").text(target);

  initCircularProgress();

  showModal("savings-details");
});

$("#close-savings").on("click", () => {
  hideModal();
  showModal("deleteSavings");
});
