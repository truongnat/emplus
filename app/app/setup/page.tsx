"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCoupleStore } from "@/features/couple/couple-store";
import { useSessionStore } from "@/features/auth/session-store";

const setupSchema = z.object({
  loveStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Vui lòng chọn ngày hợp lệ"),
});

type SetupFormData = z.infer<typeof setupSchema>;

export default function SetupPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const status = useSessionStore((state) => state.status);
  const couple = useCoupleStore((state) => state.couple);
  const createCouple = useCoupleStore((state) => state.createCouple);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetupFormData>({
    resolver: zodResolver(setupSchema),
  });

  // Redirect if already has couple
  useEffect(() => {
    if (status === "authenticated" && couple) {
      router.replace("/invite");
    }
  }, [status, couple, router]);

  const onSubmit = async (data: SetupFormData) => {
    try {
      setIsSubmitting(true);
      await createCouple({ loveStartDate: data.loveStartDate });
      router.push("/invite");
    } catch (error) {
      console.error("Setup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Thiết lập"
        title="Ngày bắt đầu yêu."
        description="Ngày này sẽ là nguồn cho bộ đếm tình yêu và các cột mốc tự động."
      />

      <Card className="space-y-4" accent="violet">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[color:var(--text-default)] mb-2">
              Ngày yêu <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("loveStartDate")}
              className="w-full px-3 py-2 border border-[color:var(--border)] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            {errors.loveStartDate && (
              <p className="mt-1 text-xs text-red-500">{errors.loveStartDate.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Đang lưu..." : "Tiếp tục"}
          </Button>
        </form>

        <div className="pt-2 border-t border-[color:var(--border)] text-xs text-[color:var(--muted)] text-center">
          Bước tiếp theo: Mời người ấy tham gia.
        </div>
      </Card>
    </>
  );
}
