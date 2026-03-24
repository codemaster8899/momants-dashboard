"use client";

import { useMeStore } from "@/stores/data/useMeStore";
import { useSidebarStateStore } from "@/stores/ui/useSidebarStateStore";
import { ChevronRight, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { ReactNode, Suspense } from "react";
import LoadingState from "../shared/LoadingState";

export default function PageWrapper({
  title,
  className,
  children,
  scrollable = true,
  headerMargin = scrollable ? "" : "mt-6 ml-6",
}: {
  title: string;
  className?: string;
  children: ReactNode;
  scrollable?: boolean;
  headerMargin?: string;
}) {
  const { sidebarOpen, setSidebarOpen } = useSidebarStateStore();
  const { currentAgent } = useMeStore();

  const toggleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // The header margin may not always be correct.
  // You can adjust `headerMargin` manually if needed.
  // This logic should be reworked in the future

  return (
    <div
      className={`flex flex-col ${scrollable ? "h-full" : "h-screen"} bg-panel rounded-tl-2xl border-l border-border shadow-sm ${className} transition-all duration-200 ${
        sidebarOpen ? "ml-16" : "ml-64"
      }`}
    >
      {/* TOP BAR / BREADCRUMB */}
      <div className={`relative overflow-hidden rounded-tl-2xl`}>
        {/* the reason for the optional margin is because when scrollable is false, the PageHeader already has margin applied */}
        <div
          className={`sticky top-0 z-50 bg-white px-2 py-4 flex items-center gap-3 momants-semibold-small-gray ${headerMargin}`}
        >
          {/* COLLAPSE TOGGLE */}
          <button
            onClick={toggleSideBar}
            className="hover:text-gray-900 transition"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>

          <span>{currentAgent?.name}</span>

          <ChevronRight size={20} />

          <span className="momants-semibold-small-black">{title}</span>
        </div>
      </div>

      {/* DIVIDER */}
      <div className={`border-t border-[#e4e6eb] mx-0`} />

      <div
        className={`rounded-xl min-h-0 h-full ${scrollable ? "flex flex-col" : "flex-1 flex flex-col"}`}
      >
        <Suspense fallback={<LoadingState />}>{children}</Suspense>
      </div>
    </div>
  );
}
