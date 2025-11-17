"use strict";

$(".add-funds").on("click", async (e) => {
  $("#spinner").removeClass("d-none");
  const userId = e.target.dataset.id;
  $("#add_money_amount input").val("");

  const user = await $.get(`/api/user/${userId}`);
  console.log(user);

  if (user.success) {
    $("#edit_user_username").text(user.data.username);
    $("#edit_user_name").text(user.data.name);
    $("#edit_user_userId").val(user.data._id);

    toggleModal("add-money-modal");
  }

  $("#spinner").addClass("d-none");
});

$(".message_user").on("click", async (e) => {
  $("#spinner").removeClass("d-none");
  const userId = e.target.dataset.id;
  $("#message_text textarea").val("");

  const user = await $.get(`/api/user/${userId}`);
  console.log(user);

  if (user.success) {
    $("#message_user_username").text(user.data.username);
    $("#message_user_name").text(user.data.name);
    $("#message_user_userId").val(user.data._id);

    toggleModal("message-user-modal");
  }

  $("#spinner").addClass("d-none");
});

$(".email_user").on("click", async (e) => {
  $("#spinner").removeClass("d-none");
  const userId = e.target.dataset.id;
  $("#email_subject input").val("");
  $("#email_text input").val("");

  const user = await $.get(`/api/user/${userId}`);
  console.log(user);

  if (user.success) {
    $("#email_user_username").text(user.data.username);
    $("#email_user_name").text(user.data.name);
    $("#email_user_userId").val(user.data._id);

    toggleModal("email-user-modal");
  }

  $("#spinner").addClass("d-none");
});
