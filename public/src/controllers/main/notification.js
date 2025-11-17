import { formatDate } from "../../helpers.js";

$(".nav-notification").addClass("active");

$(".notificationCard").on("click", (e) => {
  const ele = e.target.closest(".notificationCard");
  const obj = JSON.parse(ele.dataset.obj);
  ele.querySelector(".option-badge")?.remove();

  $("input#noticeId").val(obj._id);

  if (!obj.read) {
    $.get("/api/notification/read/" + obj._id);
    const noticeCount = +$("#noticeCountHead").text();
    if (noticeCount <= 1) {
      $("#noticeCountHead").trigger("remove");
    } else {
      $("#noticeCountHead").text(noticeCount - 1);
    }
  }

  $("#noticeSubject").text(obj.subject);
  $("#noticeDate").text(formatDate(obj.createdAt));
  $("#noticeMessage").text(obj.message);

  showModal("notificationModal");
});
