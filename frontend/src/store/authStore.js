import { create } from "zustand";

import axiosInstance from "../utils/axios.js";

import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: false,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfileImage: false,
  socket: null,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/check-auth");
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error with checking authetification", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error with signing up", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error with Signing up", error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      get().disconnectSocket();
      set({ authUser: null });
    } catch (error) {
      console.log("Error with loging out ");
    }
  },

  updateProfile: async (profileImage) => {
    set({ isUpdatingProfileImage: true });
    try {
      const response = await axiosInstance.put(
        "/auth/update-profile-image",
        profileImage,
      );
      set({ authUser: response.data });
    } catch (error) {
    } finally {
      set({ isUpdatingProfileImage: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL);
    socket.connect();
    set({ socket: socket });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
