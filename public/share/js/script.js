function showModal(id) {
  const modal = document.querySelector(`[data-bs-target="#${id}"]`);
  modal.click();
}

function hideModal() {
  const modal = document.querySelector(`[data-bs-dismiss="modal"]`);
  modal.click();
}

const displays = document.querySelectorAll(".circular-progress");
const transitionDuration = 900;

function initCircularProgress() {
  displays.forEach((display) => {
    let note = Math.round(display.dataset.note);
    let [int] = display.dataset.note.split(".");
    [int] = [Number(int)];

    strokeTransition(display, note);

    increaseNumber(display, int, "int");
  });
}

function strokeTransition(display, note) {
  const noteX = note > 100 ? 100 : note;
  let progress = display.querySelector(".circle-progress-fill");
  let radius = progress.r.baseVal.value;
  let circumference = 2 * Math.PI * radius;
  let offset = (circumference * (100 - noteX)) / 100;

  progress.style.setProperty("--initialStroke", circumference);
  progress.style.setProperty("--transitionDuration", `${transitionDuration}ms`);

  setTimeout(() => (progress.style.strokeDashoffset = offset), 100);
}

function increaseNumber(display, number, className) {
  let element = display.querySelector(`.percent-${className}`),
    decPoint = className === "int" ? "" : "",
    interval = transitionDuration / number,
    counter = 0;

  let increaseInterval = setInterval(() => {
    if (counter === number) {
      window.clearInterval(increaseInterval);
    }

    element.textContent = counter + decPoint;
    counter++;
  }, interval);
}

function previewImage(inputSelector, imageSelector) {
  const imageFile = document.querySelector(inputSelector);
  const imagePreview = document.querySelector(imageSelector);
  const originalSrc = imagePreview.getAttribute("src");

  imageFile.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        imagePreview.setAttribute("src", this.result);
        $("#uploadBtn").removeClass("d-none");
      });
      reader.readAsDataURL(file);
    } else {
      imagePreview.setAttribute("src", originalSrc);
      $("#uploadBtn").addClass("d-none");
    }
  });
}
