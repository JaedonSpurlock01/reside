import { create } from "zustand";

interface PasswordResetModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePasswordResetModal = create<PasswordResetModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePasswordResetModal;
