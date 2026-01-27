import { create } from "zustand";

import axiosInstance from "../utils/axios.js";

export const useSondagesStore = create((set, get) => ({
  sondagesOptions: null,
  sondagesResults: null,
  sondagesQuestion: null,
  isGettingSondagesOptions: true,
  isGettingSondagesResults: false,
  isVoting: false,

  getOptions: async () => {
    set({ isGettingSondagesOptions: true });
    try {
      const response = await axiosInstance.get("/sondage/get-options");
      set({ sondagesOptions: response.data });
    } catch (error) {
      console.log("Error with getting sondages options", error);
    } finally {
      set({ isGettingSondagesOptions: false });
    }
  },

  vote: async (choice) => {
    set({ isVoting: true });
    try {
      await axiosInstance.post("/sondage/vote", { vote: choice });
      const response = await axiosInstance.get("/sondage/get-results");
      set({ sondagesResults: response.data});
    } catch (error) {
      console.log("Error in voting", error);
    } finally {
      set({ isVoting: false });
    }
  },

  getResults: async () => {
    set({ isGettingSondagesResults: true });
    try {
      const response = await axiosInstance.get("/sondage/get-results");
      set({ sondagesResults: response.data });
    } catch (error) {
      console.log("Error with getting sondage result", error);
    } finally {
      set({ isGettingSondagesResults: false });
    }
  },
}));
