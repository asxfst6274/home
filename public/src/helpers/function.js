"use strick";

// Create our number dollar.
const DOLLAR = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function toTitleCase(phrase) {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function FORMAT_DATE(date = "") {
  return new Date(date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function view(view, containerSelector, url = "../php/views.php", user = "") {
  $.post(url, {
    view: view,
    action: view,
    user: user,
  }).then((responce) => {
    $(containerSelector).html(responce);
    hideSpinner();
  });
}
