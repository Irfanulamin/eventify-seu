"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import UserNavbar from "@/components/common/UserNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "user")) {
      router.replace("/register");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "user") {
    return null;
  }

  return (
    <>
      <UserNavbar />

      <div className="m-4">{children}</div>
    </>
  );
}
