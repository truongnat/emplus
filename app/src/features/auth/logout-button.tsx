"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "./session-store";

export function LogoutButton() {
  const router = useRouter();
  const logout = useSessionStore((state) => state.logout);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await logout();
    router.replace("/login");
  }

  return (
    <Button type="button" variant="secondary" className="w-full" disabled={isLoggingOut} onClick={handleLogout}>
      {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
    </Button>
  );
}
