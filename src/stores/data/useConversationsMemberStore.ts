import { create } from "zustand";

const initialState = {
  selectedMemberId: null,
  selectedMemberName: null,
  conversationEndedAt: null,
  takeOver: false,
  lastMessageId: null,
};

type ConversationsMemberState = {
  selectedMemberId: string | null;
  setSelectedMemberId: (id: string | null) => void;

  selectedMemberName: string | null;
  setSelectedMemberName: (id: string | null) => void;

  conversationEndedAt: string | null;
  setConversationEndedAt: (endedAt: string | null) => void;

  takeOver: boolean;
  setTakeOver: (id: boolean) => void;

  lastMessageId: string | null;
  setLastMessageId: (id: string | null) => void;

  clear: () => void;
};

export const useConversationsMemberStore = create<ConversationsMemberState>(
  (set) => ({
    ...initialState,

    setSelectedMemberId: (id) => set({ selectedMemberId: id }),

    setSelectedMemberName: (name) => set({ selectedMemberName: name }),

    setConversationEndedAt: (endedAt) => set({ conversationEndedAt: endedAt }),

    setTakeOver: (overTaken) => set({ takeOver: overTaken }),

    setLastMessageId: (id) => set({ lastMessageId: id }),

    clear: () => set(initialState),
  }),
);