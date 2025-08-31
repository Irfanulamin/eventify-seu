"use client";

import ScrollVelocity from "@/components/ui/seamless_text";
import React from "react";

export default function Footer() {
  return (
    <div className="w-full bg-gradient-to-b from-slate-950 to-black">
      <div className="py-6 md:py-12">
        <ScrollVelocity
          texts={["Eventiy SEU", "SEU Eventiy"]}
          className="text-white"
        />
      </div>
      <div className="w-full bg-gradient-to-b from-black via-slate-900 to-gray-900 px-16 pt-44 pb-24 flex flex-col md:flex-row justify-between items-center text-white backdrop-blur-sm bg-opacity-60">
        {/* Logo / Title */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl font-extrabold">Eventify SEU</h2>
          <p className="mt-2 max-w-sm text-gray-300">
            Centralizing all club updates, events, and workshops at SEU, making
            it easy for students to stay connected and participate.
          </p>
        </div>

        {/* Copyright */}
        <p className="mt-6 md:mt-0 text-gray-500 text-sm text-center md:text-left w-full md:w-auto">
          &copy; {new Date().getFullYear()} Eventify SEU. All rights reserved.
        </p>
      </div>
    </div>
  );
}
