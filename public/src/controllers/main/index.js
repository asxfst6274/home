$(".navbar-content-item a").removeClass("active");
$(".sidebar-nav-list a").removeClass("active");
$(".nav-home").addClass("active");
const BALANCE = $("#mainBalance").val();

$("#hide-balance").on("change", () => {
  if ($("#hide-balance").is(":checked")) {
    $(".myMainBalance").text("$ *** *** **");
    $.get("/api/hideBalance");
  } else {
    $(".myMainBalance").text(BALANCE);
    $.get("/api/showBalance");
  }
});
