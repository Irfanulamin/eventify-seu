"use client";
import { DashboardSidebar } from "@/components/common/SuperAdminSideBar";
import React, { useState } from "react";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full bg-gray-50 dark:bg-gray-900 text-black">
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white capitalize">
            Eventify SEU
          </h1>
        </header>

        <main className="flex-1 p-6 bg-white">{children}</main>
      </div>
    </div>
  );
}
