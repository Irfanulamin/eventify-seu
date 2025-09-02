import { cn } from "@/lib/utils";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useAuth } from "@/hooks/use-auth";

export default function UserNavbar() {
  const { logout } = useAuth();
  const navItems = [
    { href: "/feed", label: "Feed" },
    {
      href: "/clubs",
      label: "Clubs",
    },
    {
      href: "/request",
      label: "Requst & Feedback",
    },
  ];
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = ({
    mobile = false,
    onItemClick,
  }: {
    mobile?: boolean;
    onItemClick?: () => void;
  }) => (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative",
              mobile
                ? cn(
                    "w-full justify-start border border-white/10 hover:border-white/20",
                    isActive
                      ? "bg-gradient-to-r from-white/20 to-white/10 text-white border-white/40"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  )
                : cn(
                    "backdrop-blur-md border border-white/20 hover:border-white/30",
                    isActive
                      ? "bg-gradient-to-r from-white/30 to-white/20 text-white border-white/50"
                      : "text-white/90 hover:bg-white/15 hover:text-white"
                  )
            )}
          >
            <span className="font-semibold">{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className="flex justify-between items-center p-6 mx-4 mt-4 rounded-2xl bg-gradient-to-r from-slate-900/40 via-blue-900/30 to-purple-900/40 backdrop-blur-xl shadow-2xl border border-white/20 overflow-hidden">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
          Eventify SEU
        </h2>
        <p className="text-xs text-white/90 font-medium">
          Connect, discover, and experience
        </p>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <NavLinks />

        <div className="ml-6 pl-6 border-l border-white/30">
          <Button
            onClick={() => logout()}
            variant="destructive"
            className="group  overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-0 shadow-xl transition-all duration-200"
          >
            <LogOut className="w-4 h-4 mr-2 " />
            <span className=" font-semibold">Log Out</span>
          </Button>
        </div>
      </div>

      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 border border-white/30 backdrop-blur-md rounded-xl transition-colors duration-200"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-80 p-6 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-purple-900/95 backdrop-blur-2xl border-l border-white/20"
          >
            <SheetHeader className="pb-6">
              <SheetTitle className="flex items-center gap-4 text-white">
                <div>
                  <div className="text-lg font-bold">Eventify SEU</div>
                  <div className="text-xs text-white/60 font-normal">
                    Event Management
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-3 mt-6">
              <NavLinks mobile onItemClick={() => setIsOpen(false)} />

              <div className="mt-8 pt-6 border-t border-white/20">
                <Button
                  variant="destructive"
                  className="w-full justify-start gap-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-0 transition-colors duration-200"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-semibold">Log Out</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
