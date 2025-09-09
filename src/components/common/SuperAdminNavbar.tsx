"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BarChart3, Home, LogOut, Menu, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserPopover } from "@/components/common/UserPopover";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Separator } from "../ui/separator";

export function SuperAdminNavbar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const defaultNavItems = [
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

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
      <div>
        <h1 className="text-lg sm:text-2xl font-semibold capitalize">
          Eventify SEU
        </h1>
      </div>
      <div className="hidden lg:block">
        <UserPopover />
      </div>

      <div className="block lg:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <div className="p-2 rounded bg-blue-500 text-white shadow hover:bg-blue-600 transition-colors duration-200">
              <Menu className="w-5 h-5" />
            </div>
          </SheetTrigger>
          <SheetTitle />
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col min-h-screen h-auto bg-gradient-to-b from-blue-50 to-blue-100/50 dark:from-blue-950 dark:to-blue-900/50">
              <nav className="flex flex-col space-y-2 p-4 py-12">
                {defaultNavItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={cn(
                        "w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                        isActive
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                          : "text-blue-700 dark:text-blue-300 hover:bg-blue-200/70 dark:hover:bg-blue-800/50"
                      )}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
                <Separator className="mt-8 mb-6 border-blue-200 dark:border-blue-800" />
                <Button
                  variant="destructive"
                  className="hover:bg-red-700 text-sm duration-100 transition rounded-xl"
                  onClick={() => logout()}
                >
                  Log Out <LogOut className="w-4 h-4" />
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
