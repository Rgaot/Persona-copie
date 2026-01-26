import { create } from "zustand";

export const useNavMenuStore = create((set, get) => ({
  isNavMenuOpen: false,
  
  openNavMenu: () => {
    set({isNavMenuOpen: true});
  },
  closeNavMenu: () => {
    set({isNavMenuOpen: false});
  }
}))