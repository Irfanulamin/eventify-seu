"use client";
import { UserPopover } from "@/components/common/UserPopover";
import { AdminSidebar } from "@/components/common/AdminSidebar";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.replace("/register");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") {
    return null;
  }
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="md:ml-64">
        <UserPopover />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
