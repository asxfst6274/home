$(".approveBtn").on("click", (e) => {
  const ele = e.target.closest(".approveBtn").dataset;
  const id = ele.id;

  $("#approveModalForm").attr("action", "/loan/approve");
  $("#approveModalId").attr("name", "loanId");
  $("#approveModalId").attr("value", id);

  showModal("#approveModal");
});

$(".cancelBtn").on("click", (e) => {
  const ele = e.target.closest(".cancelBtn").dataset;
  const id = ele.id;

  $("#cancelModalForm").attr("action", "/loan/cancel");
  $("#cancelModalId").attr("name", "loanId");
  $("#cancelModalId").attr("value", id);

  showModal("#cancelModal");
});

$(".deleteBtn").on("click", (e) => {
  const ele = e.target.closest(".deleteBtn").dataset;
  const id = ele.id;

  $("#deleteModalForm").attr("action", "/loan/delete");
  $("#deleteModalId").attr("name", "loanId");
  $("#deleteModalId").attr("value", id);

  showModal("#deleteModal");
});
