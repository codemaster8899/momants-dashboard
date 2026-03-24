import { create } from "zustand";
import { persist } from "zustand/middleware";

type selectedDashboardTabStore = {
  currentTab: string;
  setCurrentTab: (currentTab: string) => void;
};

export const useSelectedDashboardTabStore = create<selectedDashboardTabStore>()(
  persist(
    (set) => ({
      currentTab: "Overview",
      setCurrentTab: (currentTab: string) => set({ currentTab }),
    }),
    {
      name: "sidebar-state",
    },
  ),
);
