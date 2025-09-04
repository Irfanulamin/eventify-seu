"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const CommonNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { type: "link", label: "Home", href: "/" },
    { type: "link", label: "About", href: "/#about" },
    { type: "link", label: "Mission", href: "/#mission" },
    { type: "button", label: "Register", href: "/register" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);

    if (href.startsWith("/#")) {
      const id = href.split("#")[1];

      if (window.location.pathname === "/") {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        router.push("/");
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <nav className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-7xl px-4">
      <div className="backdrop-blur-md border border-white/5 rounded-xl px-8 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white font-semibold text-lg">
            Eventify SEU
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navItems
              .filter((item) => item.type === "link")
              .map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            {navItems
              .filter((item) => item.type === "button")
              .map((item) => (
                <Link key={item.label} href={item.href}>
                  <Button variant="glow">{item.label}</Button>
                </Link>
              ))}
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button className="md:hidden bg-transparent text-white">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-gradient-to-b from-black/70 via-black/60 to-black/50 backdrop-blur-md border-l border-white/10 text-white shadow-2xl p-6 overflow-auto"
            >
              <SheetHeader>
                <SheetTitle className="text-white text-xl font-semibold">
                  <Link
                    href="/"
                    className="text-white font-bold text-2xl tracking-wide"
                  >
                    Eventify SEU
                  </Link>
                  <p className="text-white/70 font-medium text-sm mt-1">
                    Connect, discover, and experience
                  </p>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-8 mt-8 ml-4">
                {navItems
                  .filter((item) => item.type === "link")
                  .map((item) => (
                    <SheetClose asChild key={item.label}>
                      <p
                        onClick={() => handleNavClick(item.href)}
                        className="text-lg font-medium"
                      >
                        {item.label}
                      </p>
                    </SheetClose>
                  ))}
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
                {navItems
                  .filter((item) => item.type === "button")
                  .map((item) => (
                    <SheetClose asChild key={item.label}>
                      <Button
                        className="w-full"
                        onClick={() => handleNavClick(item.href)}
                      >
                        {item.label}
                      </Button>
                    </SheetClose>
                  ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
