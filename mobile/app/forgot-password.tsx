import React from "react";

import { AuthGridScreenShell } from "@/src/features/auth/components/AuthGridScreenShell";
import { ForgotPasswordAuthForm } from "@/src/features/auth/components/ForgotPasswordAuthForm";
import { ForgotPasswordHeroSection } from "@/src/features/auth/components/ForgotPasswordHeroSection";
import { ForgotPasswordLoginFooter } from "@/src/features/auth/components/ForgotPasswordLoginFooter";

export default function ForgotPasswordScreen() {
  return (
    <AuthGridScreenShell centerContent>
      <ForgotPasswordHeroSection />
      <ForgotPasswordAuthForm />
      <ForgotPasswordLoginFooter />
    </AuthGridScreenShell>
  );
}
