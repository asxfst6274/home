$(".nav-beneficiary").addClass("active");
$(".delete-beneficiary").on("click", (e) => {
  hideModal();
  const id = e.target.dataset.id;
  $("#beneficiaryId").val(id);
  showModal("deleteBeneficiary");
});
