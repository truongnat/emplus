import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  accent?: "rose" | "violet" | "gold";
};

const accentClass = {
  rose: "before:bg-[color:var(--rose)]",
  violet: "before:bg-[color:var(--violet)]",
  gold: "before:bg-[color:var(--gold)]",
};

export function Card({ children, className, accent }: CardProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-white/72 p-5 shadow-[0_18px_48px_rgba(117,48,54,0.12)] backdrop-blur-xl",
        accent ? "before:absolute before:inset-y-5 before:left-0 before:w-1 before:rounded-r-full" : null,
        accent ? accentClass[accent] : null,
        className,
      )}
    >
      {children}
    </section>
  );
}
