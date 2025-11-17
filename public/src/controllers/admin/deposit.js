$(".approveBtn").on("click", (e) => {
  const ele = e.target.closest(".approveBtn").dataset;
  const id = ele.id;

  $("#approveModalForm").attr("action", "/deposit/approve");
  $("#approveModalId").attr("name", "transactionId");
  $("#approveModalId").attr("value", id);

  showModal("#approveModal");
});

$(".cancelBtn").on("click", (e) => {
  const ele = e.target.closest(".cancelBtn").dataset;
  const id = ele.id;

  $("#cancelModalForm").attr("action", "/deposit/cancel");
  $("#cancelModalId").attr("name", "transactionId");
  $("#cancelModalId").attr("value", id);

  showModal("#cancelModal");
});

$(".deleteBtn").on("click", (e) => {
  const ele = e.target.closest(".deleteBtn").dataset;
  const id = ele.id;

  $("#deleteModalForm").attr("action", "/deposit/delete");
  $("#deleteModalId").attr("name", "transactionId");
  $("#deleteModalId").attr("value", id);

  showModal("#deleteModal");
});
