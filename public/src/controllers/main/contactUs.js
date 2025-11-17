import * as model from "../../models/chats.js";
import chatView from "../../views/main/contactUs.js";

$(".nav-contact").addClass("active");

const controlChats = async () => {
  try {
    chatView.renderSpinner();
    await model.loadChats();
    chatView.render(model.state);
  } catch (err) {
    console.log(err);
    chatView.renderError(err);
  }
};

const controlSendMessage = async () => {
  try {
    const message = chatView.getMessage();
    if (!message) return;
    chatView.renderSpinner(false);
    await model.sendChat(message);
    chatView.render(model.state);
  } catch (err) {
    console.log(err);
    chatView.renderError(err, false);
  }
};

const controlLoadMore = async () => {
  try {
    model.updateLimit(3);
    chatView.renderSpinner();
    await model.loadChats(model.state.limit);
    chatView.render(model.state, false);
  } catch (err) {
    console.log(err);
    chatView.renderError(err);
  }
};

const init = () => {
  chatView.addHandlerRender(controlChats);
  chatView.addHandlerSend(controlSendMessage);
  chatView.addHandlerMore(controlLoadMore);
};

init();
