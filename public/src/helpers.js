export const formatDateTime = (date, locale = "en-GB") => {
  const calcTimePassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / 1000);

  const timePassed = calcTimePassed(new Date(), new Date(date));

  if (timePassed <= 59) return "Just Now";
  if (timePassed <= 119) return `1 minute ago`;
  if (timePassed <= 60 * 59)
    return `${Math.round(timePassed / 60)} minutes ago`;
  if (timePassed <= 60 * 60) return "1 hour ago";
  if (timePassed <= 60 * 60 * 24)
    return `${Math.round(timePassed / (60 * 60))} hours ago`;
  if (timePassed <= 60 * 60 * 47) return "Yesterday";
  if (timePassed <= 60 * 60 * 24 * 7)
    return `${Math.round(timePassed / (60 * 60 * 24))} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validateName = (value) => {
  return /^[a-zA-Z ]*$/.test(value);
};

export const alpha = (value) => {
  return /^[a-zA-Z]*$/.test(value);
};

export const alphaSpace = (value) => {
  return /^[a-zA-Z ]*$/.test(value);
};

export const alphaNumeric = (value) => {
  return /^[a-zA-Z0-9.]*$/.test(value);
};

export const alphaNumericSpace = (value) => {
  return /^[a-zA-Z0-9. ]*$/.test(value);
};

export const numeric = (value) => {
  return /^[0-9.]*$/.test(value);
};

export const validateUsername = (username) => {
  return /^[a-zA-Z-_0-9]*$/.test(username);
};

export const getAge = (date) => {
  let dob;
  if (date) dob = new Date(date);
  else dob = new Date();
  const yearsTime = Date.now() - dob;
  const years = Math.trunc(yearsTime / 31536000000);
  return [years, yearsTime];
};

export const errorMessage = (message) => {
  return `
    <div
  class="alert alert-danger alert-dismissible fade show d-flex justify-content-between"
  role="alert"
>
  <strong>${message}</strong>
  <span class="text-danger fw-bold tw-cursor-pointer" data-bs-dismiss="alert"
    >X</span
  >
</div>
    `;
};

const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const dollar = (amount) => {
  return formatCurrency.format(+amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    // weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const toTitle = (word) => {
  return word.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};

export const formatDateDay = (date) => {
  return !date
    ? ""
    : new Date(date).toLocaleString("en-US", {
        // weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};
