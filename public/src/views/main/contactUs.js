import { formatDateTime } from "../../helpers.js";

class ChatView {
  _parentEle = document.querySelector(".message-full-area");
  _chatRoom = document.getElementById("chat-room");
  _chatNotic = document.getElementById("chat-notice");
  _chatNoticBottom = document.getElementById("chat-notice2");
  _input = document.getElementById("message");
  _button = document.getElementById("sendMessage");
  _more = document.getElementById("loadMore");

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerSend(handler) {
    this._button.addEventListener("click", handler);
  }

  addHandlerMore(handler) {
    this._more.addEventListener("click", handler);
  }

  _generateMarkup(data) {
    return `<div class="d-flex flex-column tw-shadow ${
      data.from === "user" ? "align-items-end" : "align-items-start"
    }"><div class="d-inline-block p-3 tw-rounded-lg mt-2 ${
      data.from !== "user"
        ? "tw-mr-[10%] tw-rounded-bl-none gradient"
        : "tw-ml-[10%] tw-border-2 tw-border-red1 tw-rounded-br-none tw-bg-red-300 tw-bg-opacity-25"
    }">
        <p class="${data.from !== "user" ? "text-white" : ""} mb-0">${
      data.message
    }</p>
        <p
        class="text-end mb-0 tw-text-sm me-3 tw-opacity-50 ${
          data.from !== "user" ? "text-white" : ""
        }"
        >
        ${formatDateTime(data.createdAt)}
        </p></div> </div>`;
  }

  getMessage() {
    this._hideGreeting();
    const message = this._input.value;
    this._clearInput();
    return message;
  }

  render(state, scroll = true) {
    const chats = state.chats;
    const count = state.count;
    const markUp = chats.map((chat) => this._generateMarkup(chat)).join("");

    this._clear();
    this._clearNotice();

    if (count <= chats.length) this._more.classList.add("d-none");
    else this._more.classList.remove("d-none");
    this._chatRoom.innerHTML = markUp;
    if (scroll) this._scroll();
  }

  renderSpinner(top = true) {
    const spinner = `
    <div class="d-flex justify-content-center tw-right-0 tw-left-0">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `;
    this._clearNotice();
    top
      ? (this._chatNotic.innerHTML = spinner)
      : (this._chatNoticBottom.innerHTML = spinner);
  }

  renderError(message, top = true) {
    this._clearNotice();
    const err = `<p class="text-center">${message}</p>`;
    top
      ? (this._chatNotic.innerHTML = err)
      : (this._chatNoticBottom.innerHTML = err);
  }

  _scroll() {
    this._parentEle.scrollTop = this._parentEle.scrollHeight;
  }

  _clear() {
    this._chatRoom.innerHTML = "";
  }

  _clearNotice() {
    this._chatNotic.innerHTML = "";
    this._chatNoticBottom.innerHTML = "";
  }

  _clearInput() {
    this._input.value = "";
  }

  _hideGreeting() {
    $("#welcomeMessage").addClass("d-none");
  }
}

export default new ChatView();
