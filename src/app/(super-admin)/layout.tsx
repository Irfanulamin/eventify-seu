"use client";

import { SuperAdminSidebar } from "@/components/common/SuperAdminSideBar";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { SuperAdminNavbar } from "@/components/common/SuperAdminNavbar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "super-admin")) {
      router.replace("/register");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "super-admin") {
    return null;
  }

  return (
    <div className="flex h-full w-full bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <SuperAdminNavbar />
        <main className="flex-1 p-4 sm:p-6 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
