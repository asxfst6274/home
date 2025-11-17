export const inputFormat = (valid, message, e, parentEle) => {
  const messageEle = parentEle.querySelector(".message");

  if (valid) return (messageEle.innerHTML = "");

  messageEle.innerHTML = `
    <p 
    class="${
      valid ? "text-success" : "text-danger"
    } tw-text-sm tw-mt-[-15px] text-left d-flex align-items-center tw-gap-2"
  >
 ${message}
  </p>`;
};

export const resetInputFormat = (parentEle) => {
  const messageEle = parentEle.querySelector(".message");

  messageEle.innerHTML = "";
};

export const checkboxFormat = (valid, message, e, parentEle) => {
  const messageEle = parentEle.querySelector(".message");

  if (!valid)
    return (messageEle.innerHTML = `
          <p 
            class="text-danger tw-text-sm tw-mt-[-5px] text-left d-flex align-items-center tw-gap-2"
          >
 ${message}
          </p>
          `);

  return (messageEle.innerHTML = "");
};

export const inputLoading = (e, parentEle) => {
  const inputEle = parentEle.querySelector("input")
    ? parentEle.querySelector("input")
    : parentEle.querySelector("textarea");
  const messageEle = parentEle.querySelector(".message");

  inputEle.classList.remove("border-success");
  inputEle.classList.remove("border-danger");

  messageEle.innerHTML = `
    <p class=" tw-text-sm tw-mt-[-15px] text-left d-flex align-items-center tw-gap-2 tw-italic">
    checking...
  </p>
            `;
};
