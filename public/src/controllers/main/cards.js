$(".nav-card").addClass("active");
$(".delete-card").on("click", (e) => {
  hideModal();
  const id = e.target.closest(".delete-card").dataset.id;
  $("#cardId").val(id);
  showModal("deleteCard");
});
