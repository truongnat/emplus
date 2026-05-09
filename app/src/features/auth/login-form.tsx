"use client";

import { useRouter } from "next/navigation";
import type { Route } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAuthErrorMessage } from "./auth-errors";
import { applyZodErrors } from "./form-utils";
import { loginSchema, type LoginFormValues } from "./auth-schemas";
import { useSessionStore } from "./session-store";

export function LoginForm() {
  const router = useRouter();
  const login = useSessionStore((state) => state.login);
  const [formError, setFormError] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const parsed = loginSchema.safeParse(values);

    if (!parsed.success) {
      applyZodErrors(parsed.error, setError);
      return;
    }

    try {
      const result = await login(parsed.data.email, parsed.data.password);

      if (result.status === "otp_required") {
        router.replace(`/verify-otp?email=${encodeURIComponent(result.email)}` as Route);
        return;
      }

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
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          type="password"
          autoComplete="current-password"
          hint={errors.password?.message}
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
        />

        {formError ? (
          <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold leading-6 text-[color:var(--rose-deep)]">
            {formError}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>

      <Button href="/register" variant="ghost" className="w-full">
        Tạo tài khoản mới
      </Button>
    </Card>
  );
}
