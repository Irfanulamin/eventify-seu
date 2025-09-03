"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  BarChart3,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
}

interface DashboardSidebarProps {
  onItemClick?: (itemId: string) => void;
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
  {
    id: "user-management",
    label: "User Management",
    icon: Users,
    href: "/user-management",
  },
  {
    id: "club-management",
    label: "Club Management",
    icon: BarChart3,
    href: "/club-management",
  },
];

export function SidebarContent({
  isCollapsed,
  setIsCollapsed,
  onItemClick,
  isMobile = false,
  onMobileClose,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onItemClick?: (itemId: string) => void;
  isMobile?: boolean;
  onMobileClose?: () => void;
}) {
  const pathname = usePathname();

  const handleItemClick = (itemId: string) => {
    onItemClick?.(itemId);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-blue-200 dark:border-blue-800">
        {(!isCollapsed || isMobile) && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            <span className="font-semibold text-blue-900 dark:text-blue-100">
              Dashboard
            </span>
          </div>
        )}
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {defaultNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link key={item.id} href={item.href} className="block">
              <button
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                  isActive
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                    : "text-blue-700 dark:text-blue-300 hover:bg-blue-200/70 dark:hover:bg-blue-800/50",
                  !isMobile && isCollapsed && "justify-center px-2"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-white" : "text-blue-600 dark:text-blue-400"
                  )}
                />

                {(!isCollapsed || isMobile) && (
                  <>
                    <span className="font-medium text-sm text-balance">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={cn(
                          "ml-auto px-2 py-0.5 text-xs rounded-full font-medium",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-blue-500 text-white"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}

                {/* Tooltip for collapsed state - only on desktop */}
                {!isMobile && isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-blue-900 dark:bg-blue-100 text-white dark:text-blue-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-200 dark:border-blue-800">
        {!isCollapsed || isMobile ? (
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-blue-100 dark:bg-blue-900/50">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 truncate">
                TEST ADMIN
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 truncate">
                admin@test.com
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export function DashboardSidebar({
  onItemClick,
  className,
}: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div
        className={cn(
          "hidden md:flex relative flex-col min-h-screen h-auto bg-gradient-to-b from-blue-50 to-blue-100/50 dark:from-blue-950 dark:to-blue-900/50 border-r border-blue-200 dark:border-blue-800 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          className
        )}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          onItemClick={onItemClick}
        />
      </div>
    </>
  );
}
