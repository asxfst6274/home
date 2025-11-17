const showModal = (id) => {
  tailwind.Modal.getInstance(document.querySelector(id)).show();
};
const hideModal = (id) => {
  tailwind.Modal.getInstance(document.querySelector(id)).hide();
};
