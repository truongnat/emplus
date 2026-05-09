"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Card } from "@/components/ui/card";
import { useSessionStore } from "@/features/auth/session-store";
import { useCoupleStore } from "@/features/couple/couple-store";

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

const coupleRequiredRoutes = new Set([
  "/home",
  "/milestones",
  "/timeline",
  "/poke",
  "/gifts",
  "/settings",
]);

const authRedirectRoutes = new Set(["/login", "/verify-otp"]);
const setupRoutes = new Set(["/setup", "/invite"]);

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const bootstrap = useSessionStore((state) => state.bootstrap);
  const sessionStatus = useSessionStore((state) => state.status);
  const fetchCouple = useCoupleStore((state) => state.fetchCouple);
  const couple = useCoupleStore((state) => state.couple);
  const coupleStatus = useCoupleStore((state) => state.status);

  const isProtectedRoute = protectedRoutes.has(pathname);
  const isCoupleRequiredRoute = coupleRequiredRoutes.has(pathname);
  const isSetupRoute = setupRoutes.has(pathname);
  const isAuthRedirectRoute = authRedirectRoutes.has(pathname);
  const showBottomNav = isProtectedRoute && !isSetupRoute;

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      void fetchCouple();
    }
  }, [sessionStatus, fetchCouple]);

  useEffect(() => {
    if (sessionStatus === "unauthenticated" && isProtectedRoute) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isProtectedRoute, pathname, router, sessionStatus]);

  useEffect(() => {
    if (sessionStatus === "authenticated" && isAuthRedirectRoute) {
      router.replace("/home");
    }
  }, [isAuthRedirectRoute, router, sessionStatus]);

  // Redirect to setup if authenticated but no couple for couple-required routes
  useEffect(() => {
    if (sessionStatus === "authenticated" && coupleStatus !== "loading" && isCoupleRequiredRoute) {
      if (!couple || coupleStatus === "no_couple") {
        router.replace("/setup");
      }
    }
  }, [sessionStatus, couple, coupleStatus, isCoupleRequiredRoute, router]);

  const isLoadingSession =
    sessionStatus === "idle" || sessionStatus === "loading";
  const isLoadingCouple =
    coupleStatus === "loading" || (sessionStatus === "authenticated" && couple === null);
  const shouldHoldProtectedRoute =
    isProtectedRoute && (isLoadingSession || (isCoupleRequiredRoute && isLoadingCouple));

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
