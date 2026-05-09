import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Route } from "next";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: Route;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="rounded-[28px] border border-dashed border-[color:var(--border-strong)] bg-white/48 px-5 py-8 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[color:var(--soft)] text-[color:var(--rose)]">
        <Heart className="size-5" />
      </div>
      <h2 className="mt-4 text-xl font-black">{title}</h2>
      <p className="mx-auto mt-2 max-w-[28ch] text-sm leading-6 text-[color:var(--muted)]">
        {description}
      </p>
      {actionLabel && actionHref ? (
        <Button href={actionHref} variant="secondary" className="mt-5">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
