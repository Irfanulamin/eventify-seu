"use client";

import ScrollVelocity from "@/components/ui/seamless_text";
import { MoveUp } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="w-full bg-gradient-to-b from-black to-gray-900">
      <div className="hidden md:block py-6 md:py-12">
        <ScrollVelocity
          texts={["Eventify SEU", "SEU Eventify"]}
          className="text-white"
        />
      </div>
      <div className="w-full   px-16 pt-44 pb-24 flex flex-col md:flex-row justify-between items-center text-white backdrop-blur-sm bg-opacity-60">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl font-extrabold">Eventify SEU</h2>
          <p className="mt-2 max-w-sm">
            Centralizing all club updates, events, and workshops at SEU, making
            it easy for students to stay connected and participate.
          </p>
        </div>
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <p className="mt-6 md:mt-0 text-sm text-center md:text-left w-full md:w-auto">
            &copy; {new Date().getFullYear()} Eventify SEU. All rights reserved.
          </p>
          <Link
            href="#banner"
            className="p-2 rounded-full border border-white cursor-pointer hover:scale-110 transition-transform"
          >
            <MoveUp className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
