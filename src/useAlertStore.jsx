import create from "zustand";

export const useAlertStore = create((set) => ({
  alert: { status: "", message: "", isOpen: false },
  showAlert: (status, message) =>
    set({ alert: { status, message, isOpen: true } }),
  hideAlert: () => set({ alert: { status: "", message: "", isOpen: false } }),
}));
