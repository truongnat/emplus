import { cn } from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function Input({ label, hint, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name ?? label;

  return (
    <label htmlFor={inputId} className="block space-y-2">
      <span className="text-sm font-black text-[color:var(--foreground)]">{label}</span>
      <input
        id={inputId}
        className={cn(
          "h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white/78 px-4 text-[15px] font-bold text-[color:var(--foreground)] outline-none transition placeholder:text-[color:var(--muted)]/70 focus:border-[color:var(--rose)] focus:ring-4 focus:ring-rose-100",
          className,
        )}
        {...props}
      />
      {hint ? <span className="text-xs font-semibold text-[color:var(--muted)]">{hint}</span> : null}
    </label>
  );
}
