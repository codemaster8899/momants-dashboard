import { create } from "zustand";
import { Message } from "@/app/(dashboard)/conversations/types";

type CurrentMessageStateStore = {
  message: Message | null;
  setMessage: (message: Message | null) => void;
};

export const useCurrentMessageStateStore = create<CurrentMessageStateStore>((set) => ({
  message: null,
  setMessage: (message: Message | null) => set({ message: message }),
}));
