"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { UserPopover } from "./UserPopover";

export default function UserNavbar() {
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/feed", label: "Feed" },
    { href: "/messages", label: "Messages" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
              "font-medium relative text-base transition-all duration-200 rounded-md px-3 py-1",
              mobile
                ? cn(
                    "w-full text-left block p-2",
                    isActive
                      ? "bg-blue-100 text-black "
                      : "text-gray-700 hover:bg-gray-100"
                  )
                : cn(
                    "group px-3 py-1.5 rounded-md transition-colors duration-200",
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                  )
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div
      className={cn(
        "sticky top-0 z-50 transition-transform duration-300 ease-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <nav className="bg-gray-50 shadow">
        <div className="flex justify-between items-center px-12 py-5">
          <h2 className="text-2xl font-bold text-black">Eventify SEU</h2>
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
            <UserPopover />
          </div>
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:bg-gray-100 rounded-full"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 flex flex-col justify-between p-6 bg-gradient-to-b from-white to-gray-50"
              >
                <div>
                  <SheetHeader>
                    <SheetTitle className="text-left text-gray-900 font-bold text-xl">
                      Eventify SEU
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-3 mt-6">
                    <NavLinks mobile onItemClick={() => setIsOpen(false)} />
                  </div>
                </div>
                <div className="border-t pt-4 mt-6">
                  <UserPopover />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
}
