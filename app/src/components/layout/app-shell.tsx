import { BottomNav } from "@/components/layout/bottom-nav";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-4 pb-28 pt-4">
      <div className="flex flex-1 flex-col gap-5">{children}</div>
      <BottomNav />
    </div>
  );
}
