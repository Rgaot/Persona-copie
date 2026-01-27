import { create } from "zustand";

import axiosInstance from "../utils/axios.js";

export const useSondagesStore = create((set, get) => ({
  sondagesOptions: null,
  sondagesResults: null,
  sondagesQuestion: null,
  isGettingSondagesOptions: true,
  isGettingSondagesResults: false,

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
}));
