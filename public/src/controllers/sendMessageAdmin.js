import Button from "../views/form/button.js";
import Input from "../views/form/input.js";

// import config from "../config.js";

const inputMessage = { value: "", valid: false };

const submitOnClick = async (isValid, e) => {
  //   e.preventDefault();
  if (!isValid) return;
  $("#send-message").prop("disabled", true);
  $("#send-message").text("Sending...");

  const message = $("#message textarea").val();

  const res = await $.post("/api/send-message", {
    message: message,
    userId: $("#userId").val(),
    _csrf: $("#csrfToken").val(),
  });

  console.log(res);

  if (res.success) {
    const template = `
        <div class="d-flex flex-column align-items-end">
            <div class="tw-ml-[10%] tw-rounded-br-none tw-bg-pink tw-bg-opacity-25 d-inline-block p-3 tw-rounded-lg mt-1">
                <p class="mb-0">${message}</p>
                <p class="text-end mb-0 tw-text-sm tw-opacity-50">
                Just now
                </p>
            </div>
        </div>
        `;
    $("#message textarea").val("");
    $("#chat-room").append(template);
  }
  $("#send-message").text("Send");
  $("#send-message").prop("disabled", false);
};

const messageRules = (value, callback) => {
  if (!value) return callback(false);
  return callback(true);
};

const sendBtn = new Button({
  elementId: "send-message",
  stores: [inputMessage],
  checkTime: 1,
  onClick: submitOnClick,
});

new Input({
  parentId: "message",
  store: inputMessage,
  button: sendBtn,
  rules: messageRules,
});
