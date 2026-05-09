import { cn } from "@/lib/cn";

type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
  tone?: "rose" | "violet" | "gold";
};

const toneClass = {
  rose: "from-rose-50 to-white text-rose-700",
  violet: "from-violet-50 to-white text-violet-700",
  gold: "from-amber-50 to-white text-amber-800",
};

export function StatCard({ label, value, helper, tone = "rose" }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-[color:var(--border)] bg-gradient-to-br p-4 shadow-[0_12px_30px_rgba(117,48,54,0.08)]",
        toneClass[tone],
      )}
    >
      <p className="text-xs font-black uppercase tracking-[0.14em] opacity-70">{label}</p>
      <p className="mt-2 text-3xl font-black leading-none">{value}</p>
      {helper ? <p className="mt-2 text-xs font-bold opacity-70">{helper}</p> : null}
    </div>
  );
}
