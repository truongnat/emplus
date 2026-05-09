import { Badge } from "@/components/ui/badge";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: string;
};

export function PageHeader({ eyebrow, title, description, badge }: PageHeaderProps) {
  return (
    <header className="space-y-3 pt-2">
      <div className="flex items-center justify-between gap-3">
        {eyebrow ? (
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[color:var(--rose-deep)]">
            {eyebrow}
          </p>
        ) : (
          <span />
        )}
        {badge ? <Badge tone="violet">{badge}</Badge> : null}
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-black leading-[0.98] text-[color:var(--foreground)]">
          {title}
        </h1>
        {description ? (
          <p className="max-w-[34ch] text-[15px] leading-6 text-[color:var(--muted)]">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
