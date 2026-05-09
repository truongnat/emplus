type SectionTitleProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function SectionTitle({ title, description, action }: SectionTitleProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="space-y-1">
        <h2 className="text-lg font-black text-[color:var(--foreground)]">{title}</h2>
        {description ? (
          <p className="text-sm leading-5 text-[color:var(--muted)]">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
