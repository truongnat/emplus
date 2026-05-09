import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonProps =
  | (ButtonBaseProps & {
      href: Route;
      type?: never;
    })
  | (ButtonBaseProps &
      React.ButtonHTMLAttributes<HTMLButtonElement> & {
      href?: never;
    });

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-[color:var(--rose)] text-white shadow-[0_16px_34px_rgba(212,72,103,0.28)] hover:bg-[color:var(--rose-deep)]",
  secondary:
    "border border-[color:var(--border)] bg-white/72 text-[color:var(--foreground)] shadow-[0_10px_28px_rgba(117,48,54,0.08)] hover:bg-white",
  ghost: "text-[color:var(--rose-deep)] hover:bg-[color:var(--soft)]",
};

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-black transition active:scale-[0.99]",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
    variantClass[variant],
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} type={props.type ?? "button"} className={classes}>
      {children}
    </button>
  );
}
