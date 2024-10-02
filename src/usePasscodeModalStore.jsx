// stores/usePasscodeModalStore.js
import create from "zustand";

export const usePasscodeModalStore = create((set) => ({
  isPasscodeModalOpen: false,
  enteredPasscode: "",
  openPasscodeModal: () => set({ isPasscodeModalOpen: true }),
  closePasscodeModal: () =>
    set({ isPasscodeModalOpen: false, enteredPasscode: "" }),
  setEnteredPasscode: (passcode) => set({ enteredPasscode: passcode }),
}));
