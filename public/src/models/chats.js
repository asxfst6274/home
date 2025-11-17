export const state = {
  chats: [],
  limit: 5,
  count: 0,
};

export const loadChats = async (limit = "") => {
  const res = await $.get("/api/chats?limit=" + limit);
  if (!res.success) return Promise.reject(res.message);
  state.chats = res.data;
  state.count = res.count;
};

export const sendChat = async (message) => {
  if (!message) return;
  const _csrf = $("#csrf").val();
  const res = await $.post("/api/send-chat", {
    message,
    _csrf,
  });
  if (!res.success) return Promise.reject(res.message);
  await loadChats(state.limit);
};

export const updateLimit = (limit) => {
  state.limit += limit;
  if (state.limit >= state.count) return (state.limit = state.count);
};
