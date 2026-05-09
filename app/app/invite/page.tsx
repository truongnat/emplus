"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { useCoupleStore } from "@/features/couple/couple-store";
import { useSessionStore } from "@/features/auth/session-store";

const joinSchema = z.object({
  inviteCode: z.string().min(6, "Mã mời phải có ít nhất 6 ký tự").toUpperCase(),
});

type JoinFormData = z.infer<typeof joinSchema>;

export default function InvitePage() {
  const router = useRouter();
  const status = useSessionStore((state) => state.status);
  const couple = useCoupleStore((state) => state.couple);
  const inviteCode = useCoupleStore((state) => state.inviteCode);
  const isJoining = useCoupleStore((state) => state.isJoining);
  const joinCouple = useCoupleStore((state) => state.joinCouple);
  const fetchCouple = useCoupleStore((state) => state.fetchCouple);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"share" | "join">("share");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormData>({
    resolver: zodResolver(joinSchema),
  });

  // Fetch couple info on mount
  useEffect(() => {
    if (status === "authenticated") {
      void fetchCouple();
    }
  }, [status, fetchCouple]);

  // Redirect if paired
  useEffect(() => {
    if (status === "authenticated" && couple?.partner) {
      router.replace("/home");
    }
  }, [status, couple?.partner, router]);

  const handleCopyInviteCode = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const onSubmit = async (data: JoinFormData) => {
    try {
      await joinCouple({ inviteCode: data.inviteCode });
      router.push("/home");
    } catch (error) {
      console.error("Join error:", error);
    }
  };

  // Show nothing while loading couple data
  if (status === "loading" || !couple) {
    return null;
  }

  const isPaired = !!couple.partner;

  return (
    <>
      <PageHeader
        eyebrow="Mời người ấy"
        title="Cùng nhau mở Em+."
        description="Chia sẻ mã mời hoặc nhập mã từ người yêu của bạn."
      />

      {!isPaired && (
        <>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTab("share")}
              className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition ${
                tab === "share"
                  ? "bg-violet-100 text-violet-700"
                  : "bg-[color:var(--card-bg)] text-[color:var(--text-muted)]"
              }`}
            >
              Chia sẻ
            </button>
            <button
              onClick={() => setTab("join")}
              className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition ${
                tab === "join"
                  ? "bg-violet-100 text-violet-700"
                  : "bg-[color:var(--card-bg)] text-[color:var(--text-muted)]"
              }`}
            >
              Tham gia
            </button>
          </div>

          {tab === "share" && (
            <Card className="space-y-4">
              {inviteCode ? (
                <>
                  <div className="text-center">
                    <p className="text-xs text-[color:var(--muted)] mb-2">Mã mời</p>
                    <code className="text-2xl font-black tracking-wider text-violet-700">
                      {inviteCode}
                    </code>
                  </div>
                  <Button onClick={handleCopyInviteCode} className="w-full" variant="secondary">
                    {copied ? "✓ Đã sao chép" : "Sao chép mã"}
                  </Button>
                  <div className="text-xs text-[color:var(--muted)] text-center">
                    Chia sẻ mã này với người yêu để họ tham gia cặp đôi của bạn.
                  </div>
                </>
              ) : (
                <EmptyState
                  title="Chưa có mã mời"
                  description="Vui lòng quay lại trang thiết lập để tạo cặp đôi."
                  actionHref="/setup"
                  actionLabel="Quay lại"
                />
              )}
            </Card>
          )}

          {tab === "join" && (
            <Card className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    label="Mã mời của người yêu"
                    placeholder="Ví dụ: ABC123"
                    {...register("inviteCode")}
                  />
                  {errors.inviteCode && (
                    <p className="mt-1 text-xs text-red-500">{errors.inviteCode.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isJoining}
                  className="w-full"
                >
                  {isJoining ? "Đang tham gia..." : "Tham gia cặp đôi"}
                </Button>
              </form>

              <div className="text-xs text-[color:var(--muted)] text-center">
                Nhập mã mời mà người yêu của bạn chia sẻ để tham gia cùng.
              </div>
            </Card>
          )}
        </>
      )}

      {isPaired && couple.partner && (
        <Card className="space-y-3 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
          <div className="text-center">
            <p className="text-3xl mb-2">💕</p>
            <h2 className="text-lg font-black text-rose-700">Ghép đôi thành công!</h2>
            <p className="text-sm text-rose-600 mt-2">
              Bạn và {couple.partner.fullName} đã sẵn sàng.
            </p>
          </div>
          <Button href="/home" className="w-full">
            Bắt đầu với Em+
          </Button>
        </Card>
      )}
    </>
  );
}
