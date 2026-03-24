import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Agent = {
  id: string;
  name: string;
  logo: string;
  currency: string;
};

export type MeState = {
  email: string | null;
  agents: Agent[];
  currentAgent: Agent | null;

  setEmail: (email: string | null) => void;
  setAgents: (agents: Agent[]) => void;
  setCurrentAgent: (agent: Agent | null) => void;
  clear: () => void;
};

export const useMeStore = create<MeState>()(
  persist(
    (set) => ({
      email: null,
      agents: [],
      currentAgent: null,

      setCurrentAgent: (currentAgent: Agent | null) => set({ currentAgent }),
      setEmail: (email) => set({ email }),
      setAgents: (agents) => set({ agents }),
      clear: () => set({ email: null, agents: [], currentAgent: null }),
    }),
    {
      name: "user-agents-store",
    },
  ),
);
