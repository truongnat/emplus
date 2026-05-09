import Link from "next/link";
import type { Route } from "next";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: Route;
  primaryLabel?: string;
};

const routeLinks: Array<{ href: Route; label: string }> = [
  { href: "/", label: "Start" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
  { href: "/setup", label: "Setup" },
  { href: "/invite", label: "Invite" },
  { href: "/home", label: "Home" },
  { href: "/milestones", label: "Milestones" },
  { href: "/timeline", label: "Timeline" },
  { href: "/poke", label: "Poke" },
  { href: "/gifts", label: "Gifts" },
  { href: "/settings", label: "Settings" },
];

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  primaryHref = "/home",
  primaryLabel = "Open home",
}: PlaceholderPageProps) {
  return (
    <section className="flex flex-1 flex-col gap-6 rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-6 shadow-[0_24px_70px_rgba(119,55,38,0.16)] backdrop-blur">
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--accent-strong)]">
          {eyebrow}
        </p>
        <div className="space-y-3">
          <h1 className="text-4xl font-black leading-[0.96] text-[color:var(--foreground)]">
            {title}
          </h1>
          <p className="max-w-[34ch] text-base leading-7 text-[color:var(--muted)]">
            {description}
          </p>
        </div>
      </header>

      <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--muted)]">
              MVP shell
            </p>
            <p className="mt-2 text-2xl font-black">Mobile-first PWA</p>
          </div>
          <span className="rounded-full bg-[#2f1711] px-3 py-1 text-xs font-bold text-white">
            430px
          </span>
        </div>
      </div>

      <Link
        href={primaryHref}
        className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-center text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(216,79,104,0.3)] transition hover:bg-[color:var(--accent-strong)]"
      >
        {primaryLabel}
      </Link>

      <nav aria-label="Placeholder routes" className="mt-auto flex flex-wrap gap-2">
        {routeLinks.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="rounded-full border border-[color:var(--border)] bg-white/60 px-3 py-2 text-xs font-bold text-[color:var(--muted)]"
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
