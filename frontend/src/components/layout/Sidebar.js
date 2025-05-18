"use client";

import { Folder, Star, History, Settings, FileSearch } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`relative bg-gray-50 dark:bg-gray-900 shrink-0 border-r transition-all duration-300 ${
        isCollapsed ? "w-[60px]" : "w-[240px]"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="flex flex-col gap-2 px-2">
            <SidebarItem
              icon={<Star className="h-5 w-5" />}
              label="Dashboard"
              href="/dashboard"
              isCollapsed={isCollapsed}
              isActive={pathname === "/dashboard"}
            />
            <SidebarItem
              icon={<FileSearch className="h-5 w-5" />}
              label="Fact Checker"
              href="/factcheck"
              isCollapsed={isCollapsed}
              isActive={pathname === "/factcheck"}
            />
            <SidebarItem
              icon={<Folder className="h-5 w-5" />}
              label="My Topics"
              href="/topics"
              isCollapsed={isCollapsed}
              isActive={pathname === "/topics"}
            />
            <SidebarItem
              icon={<History className="h-5 w-5" />}
              label="History"
              href="/history"
              isCollapsed={isCollapsed}
              isActive={pathname === "/history"}
            />
            <SidebarItem
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              href="/settings"
              isCollapsed={isCollapsed}
              isActive={pathname === "/settings"}
            />
          </nav>
        </div>

        <button
          className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-white dark:bg-gray-800"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, href, isCollapsed, isActive }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
        isActive 
          ? "bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100" 
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
      } transition-colors`}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
}
