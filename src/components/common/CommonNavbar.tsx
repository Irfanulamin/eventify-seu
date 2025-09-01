"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const CommonNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { type: "link", label: "Home", href: "/" },
    { type: "link", label: "About", href: "#about" },
    { type: "link", label: "Mission", href: "#mission" },
    { type: "button", label: "Register", href: "/register" },
  ];
  return (
    <nav className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-6xl px-4">
      <div className="bg-gradient-to-r from-black/20 to-blue-900/20 backdrop-blur-md border border-white/5 rounded-full px-8 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold text-lg">Eventify SEU</div>

          {/* Desktop Navigation */}
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
                  <Button>{item.label}</Button>
                </Link>
              ))}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden text-white p-3 hover:bg-white/10 rounded-full transition-all duration-200 active:scale-95"
                aria-label="Open mobile menu"
              >
                <Menu size={32} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-gradient-to-b from-black/70 via-black/60 to-black/50 backdrop-blur-md border-l border-white/10 text-white shadow-2xl p-6 overflow-auto transition-transform duration-500 ease-in-out"
            >
              <SheetHeader>
                <SheetTitle className="text-white text-xl font-semibold">
                  <div className="text-white font-bold text-2xl tracking-wide">
                    Eventify SEU
                  </div>
                  <p className="text-white/70 font-medium text-sm mt-1">
                    Connect, discover, and experience
                  </p>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col space-y-4 mt-8">
                {navItems
                  .filter((item) => item.type === "link")
                  .map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="relative group text-lg font-medium py-3 px-4 rounded-xl overflow-hidden border-l-4 border-transparent transition-all duration-300"
                    >
                      <span className="absolute inset-0 bg-white/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-left"></span>
                      <span className="relative text-white group-hover:text-blue-400">
                        {item.label}
                      </span>
                    </Link>
                  ))}
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
                {navItems
                  .filter((item) => item.type === "button")
                  .map((item) => (
                    <Link key={item.label} href={item.href}>
                      <Button onClick={() => setIsOpen(false)}>
                        {item.label}
                      </Button>
                    </Link>
                  ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
