"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Card } from "@/components/ui/card";
import { useSessionStore } from "@/features/auth/session-store";

type AppShellProps = {
  children: React.ReactNode;
};

const protectedRoutes = new Set([
  "/setup",
  "/invite",
  "/home",
  "/milestones",
  "/timeline",
  "/poke",
  "/gifts",
  "/settings",
]);

const authRedirectRoutes = new Set(["/login", "/verify-otp"]);

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const bootstrap = useSessionStore((state) => state.bootstrap);
  const status = useSessionStore((state) => state.status);
  const isProtectedRoute = protectedRoutes.has(pathname);
  const isAuthRedirectRoute = authRedirectRoutes.has(pathname);
  const showBottomNav = isProtectedRoute;

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  useEffect(() => {
    if (status === "unauthenticated" && isProtectedRoute) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isProtectedRoute, pathname, router, status]);

  useEffect(() => {
    if (status === "authenticated" && isAuthRedirectRoute) {
      router.replace("/home");
    }
  }, [isAuthRedirectRoute, router, status]);

  const shouldHoldProtectedRoute =
    isProtectedRoute && (status === "idle" || status === "loading" || status === "unauthenticated");

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-4 pb-28 pt-4">
      <div className="flex flex-1 flex-col gap-5">
        {shouldHoldProtectedRoute ? (
          <Card className="mt-12 space-y-2 text-center">
            <p className="text-sm font-black text-[color:var(--rose-deep)]">Em+</p>
            <h1 className="text-2xl font-black">Đang kiểm tra phiên đăng nhập...</h1>
            <p className="text-sm font-bold leading-6 text-[color:var(--muted)]">
              Nếu bạn chưa đăng nhập, Em+ sẽ đưa bạn về màn hình đăng nhập.
            </p>
          </Card>
        ) : (
          children
        )}
      </div>
      {showBottomNav ? <BottomNav /> : null}
    </div>
  );
}
