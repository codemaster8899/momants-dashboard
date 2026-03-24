import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarStateStore = {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
};

export const useSidebarStateStore = create<SidebarStateStore>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (sidebarOpen: boolean) => set({ sidebarOpen }),
    }),
    {
      name: "sidebar-state",
    },
  ),
);
