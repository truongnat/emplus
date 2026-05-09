"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { getAuthErrorMessage } from "./auth-errors";
import { applyZodErrors } from "./form-utils";
import { registerSchema, type RegisterFormValues } from "./auth-schemas";
import { useSessionStore } from "./session-store";

export function RegisterForm() {
  const router = useRouter();
  const registerUser = useSessionStore((state) => state.register);
  const [formError, setFormError] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      gender: "OTHER",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const parsed = registerSchema.safeParse(values);

    if (!parsed.success) {
      applyZodErrors(parsed.error, setError);
      return;
    }

    try {
      await registerUser(parsed.data);
      router.replace("/setup");
    } catch (error) {
      setFormError(getAuthErrorMessage(error));
    }
  });

  return (
    <Card className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Tên của bạn"
          placeholder="Ví dụ: Linh"
          autoComplete="name"
          hint={errors.fullName?.message}
          aria-invalid={Boolean(errors.fullName)}
          {...register("fullName")}
        />
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
          placeholder="Tối thiểu 8 ký tự"
          type="password"
          autoComplete="new-password"
          hint={errors.password?.message}
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
        />

        <label className="block space-y-2">
          <span className="text-sm font-black text-[color:var(--foreground)]">Cách xưng hô</span>
          <select
            className={cn(
              "h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white/78 px-4 text-[15px] font-bold text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--rose)] focus:ring-4 focus:ring-rose-100",
            )}
            {...register("gender")}
          >
            <option value="OTHER">Mình chọn sau</option>
            <option value="FEMALE">Nữ</option>
            <option value="MALE">Nam</option>
            <option value="PREFER_NOT_TO_SAY">Không muốn nói</option>
          </select>
        </label>

        {formError ? (
          <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold leading-6 text-[color:var(--rose-deep)]">
            {formError}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
        </Button>
      </form>

      <Button href="/login" variant="ghost" className="w-full">
        Mình đã có tài khoản
      </Button>
    </Card>
  );
}
