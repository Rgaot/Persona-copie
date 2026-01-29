import { create } from "zustand";

import axiosInstance from "../utils/axios.js";
import { useAuthStore } from "./authStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  isSendingMessage: false,
  isLoadingMessages: false,
  selectedUser: "",

  getMessages: async () => {
    set({ isLoadingMessages: true });
    try {
      const response = await axiosInstance.get("/message/get");
      set({ messages: response.data });
    } catch (error) {
      console.log("Error in getting messages", error);
    } finally {
      set({ isLoadingMessages: false });
    }
  },

  sendMessage: async (text) => {
    set({ isSendingMessage: true });
    try {
      axiosInstance.post("/message/send", { text: text });
    } catch (error) {
      console.log("Error in sening message", error);
    } finally {
      set({ isSendingMessage: false });
    }
  },

  listenToMessages: async () => {
    const socket = useAuthStore.getState().socket;
    socket.on("New message", (message) => {
      set({ messages: [...get().messages, message] });
    });
    await get().getMessages();
  },

  stopListenToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("New message");
  },

  showInfos: (senderId, messageId) => {
    const authUser = useAuthStore.getState().authUser;
    if (
      get().selectedUser &&
      get().selectedUser.senderId === senderId &&
      get().selectedUser.messageId === messageId
    ) {
      set({ selectedUser: "" });
    } else {
      set({ selectedUser: { senderId: senderId, messageId: messageId } });
    }
  },
}));
