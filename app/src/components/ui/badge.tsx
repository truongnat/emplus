import { cn } from "@/lib/cn";

type BadgeTone = "rose" | "violet" | "gold" | "neutral";

type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const toneClass: Record<BadgeTone, string> = {
  rose: "bg-rose-100 text-rose-700 ring-rose-200",
  violet: "bg-violet-100 text-violet-700 ring-violet-200",
  gold: "bg-amber-100 text-amber-800 ring-amber-200",
  neutral: "bg-white/70 text-[color:var(--muted)] ring-[color:var(--border)]",
};

export function Badge({ children, tone = "rose", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-black ring-1",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
