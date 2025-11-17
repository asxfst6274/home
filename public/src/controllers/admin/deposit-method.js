$(".deleteBtn").on("click", (e) => {
  const ele = e.target.closest(".deleteBtn").dataset;
  const id = ele.id;

  $("#deleteModalForm").attr("action", "/deposit-method/delete");
  $("#deleteModalId").attr("name", "methodId");
  $("#deleteModalId").attr("value", id);

  showModal("#deleteModal");
});
