import { create } from "zustand";

type ConversationsStateStore = {
  detailOpen: boolean;
  setDetailOpen: (detailOpen: boolean) => void;

  chatSearchQuery: string;
  setChatSearchQuery: (query: string) => void;
};

export const useConversationsStateStore = create<ConversationsStateStore>((set) => ({
  detailOpen: true,
  setDetailOpen: (detailOpen: boolean) => set({ detailOpen: detailOpen }),

  chatSearchQuery: "",
  setChatSearchQuery: (query: string) => set({ chatSearchQuery: query }),
}));
