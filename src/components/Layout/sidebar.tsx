"use client";

import { useSidebarStateStore } from "@/stores/ui/useSidebarStateStore";
import {
  Brain,
  Inbox,
  LayoutDashboard,
  LogOut,
  Megaphone,
  QrCode,
  Zap,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType, useState } from "react";
import { LogoutPopup } from "./LogoutPopup";

import { useMeStore } from "@/stores/data/useMeStore";
import { AgentToggleButton } from "./AgentToggle";

type SidebarItem = [string, string, ElementType];

const items: SidebarItem[] = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/training", "Training", Brain],
  ["/conversations", "Conversations", Inbox],
  ["/templates", "Templates", Zap],
  ["/campaigns", "Campaigns", Megaphone],
  ["/qrcodes", "QR Codes", QrCode],
];

export default function Sidebar() {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { currentAgent, setCurrentAgent, agents, email } = useMeStore();

  const pathname = usePathname();
  const { sidebarOpen } = useSidebarStateStore();

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  return (
    <aside
      className={`bg-black text-white flex flex-col transition-all duration-200 fixed left-0 top-0 h-screen ${
        sidebarOpen ? "w-16" : "w-64"
      }`}
    >
      {/* LOGO */}
      <div className="px-4 py-5 border-b border-gray-800 flex items-center gap-2">
        <NextImage
          src="https://dashboard.momants.ai/_next/image?url=https%3A%2F%2Fmomants-dashboard.ams3.cdn.digitaloceanspaces.com%2Fmomants-icon.png&w=32&q=75"
          alt="Momants"
          width={32}
          height={32}
          className="rounded-md"
        />
        {!sidebarOpen && (
          <span className="momants-semibold-mediumlarge-white">Momants</span>
        )}
      </div>

      {/* NAV */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {items.map(([href, label, Icon]) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center rounded-md momants-light-small-white transition min-h-[44px]
                ${sidebarOpen ? "justify-center px-0" : "gap-4 px-3"}
                ${active ? "bg-neutral-800" : "hover:bg-neutral-800"}
              `}
            >
              <Icon size={18} className="text-gray-300 shrink-0" />
              <span
                className={`whitespace-nowrap transition-all duration-200
                  ${sidebarOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"}
                `}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER / USER */}
      <div className="border-t border-gray-800">
        <div
          className={`flex items-center mb-3 transition-all
            ${sidebarOpen ? "justify-center px-0 py-4" : "gap-3 px-4 py-4"}
          `}
        >
          <AgentToggleButton
            agents={agents}
            selectedAgent={currentAgent}
            handleAgentSelect={setCurrentAgent}
          />

          {!sidebarOpen && (
            <span className="momants-light-extrasmall-white truncate">
              {email}
            </span>
          )}
        </div>

        <div className={sidebarOpen ? "mb-6" : "mb-3"}>
          <button
            onClick={handleLogout}
            className={`flex items-center w-full h-12 transition momants-light-small-white
              ${sidebarOpen ? "justify-center" : "gap-4 px-7"}
            `}
          >
            <LogOut size={18} className="shrink-0" />

            <span
              className={`whitespace-nowrap transition-all duration-200 leading-none
                ${sidebarOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"}
              `}
            >
              Logout
            </span>
          </button>
        </div>
      </div>

      {showLogoutPopup && <LogoutPopup />}
    </aside>
  );
}
