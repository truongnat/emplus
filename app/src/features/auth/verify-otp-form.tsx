"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAuthErrorMessage } from "./auth-errors";
import { applyZodErrors } from "./form-utils";
import { verifyOtpSchema, type VerifyOtpFormValues } from "./auth-schemas";
import { useSessionStore } from "./session-store";

export function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pendingOtpEmail = useSessionStore((state) => state.pendingOtpEmail);
  const verifyOtp = useSessionStore((state) => state.verifyOtp);
  const defaultEmail = useMemo(
    () => searchParams.get("email") ?? pendingOtpEmail ?? "",
    [pendingOtpEmail, searchParams],
  );
  const [formError, setFormError] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<VerifyOtpFormValues>({
    defaultValues: {
      email: defaultEmail,
      otp: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const parsed = verifyOtpSchema.safeParse(values);

    if (!parsed.success) {
      applyZodErrors(parsed.error, setError);
      return;
    }

    try {
      await verifyOtp(parsed.data.email, parsed.data.otp);
      router.replace("/home");
    } catch (error) {
      setFormError(getAuthErrorMessage(error));
    }
  });

  return (
    <Card className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Email"
          placeholder="ban@example.com"
          type="email"
          autoComplete="email"
          hint={errors.email?.message}
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        <Input
          label="Mã OTP"
          placeholder="Nhập mã trong email"
          inputMode="numeric"
          autoComplete="one-time-code"
          hint={errors.otp?.message}
          aria-invalid={Boolean(errors.otp)}
          {...register("otp")}
        />

        {formError ? (
          <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold leading-6 text-[color:var(--rose-deep)]">
            {formError}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Đang xác minh..." : "Xác minh"}
        </Button>
      </form>

      <Button href="/login" variant="ghost" className="w-full">
        Quay lại đăng nhập
      </Button>
    </Card>
  );
}
