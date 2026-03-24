import Sidebar from "@/components/Layout/sidebar";
import { ReactNode } from "react";

interface DashboardLayout {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayout) {
  return (
    <div className="flex min-h-screen bg-black">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
