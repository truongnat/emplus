"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { CalendarDays, HandHeart, Home, Images, Settings } from "lucide-react";
import { cn } from "@/lib/cn";

const navItems: Array<{
  href: Route;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}> = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/milestones", label: "Milestones", icon: CalendarDays },
  { href: "/timeline", label: "Timeline", icon: Images },
  { href: "/poke", label: "Poke", icon: HandHeart },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Điều hướng chính"
      className="fixed inset-x-0 bottom-4 z-20 mx-auto w-[calc(100%-24px)] max-w-[398px] rounded-[28px] border border-[color:var(--border)] bg-white/78 px-2 py-2 shadow-[0_18px_45px_rgba(117,48,54,0.18)] backdrop-blur-xl"
    >
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-3xl text-[11px] font-extrabold transition",
                isActive
                  ? "bg-[color:var(--rose)] text-white shadow-[0_12px_26px_rgba(212,72,103,0.28)]"
                  : "text-[color:var(--muted)] hover:bg-[color:var(--soft)] hover:text-[color:var(--foreground)]",
              )}
            >
              <Icon className="size-5" strokeWidth={isActive ? 2.6 : 2.2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
