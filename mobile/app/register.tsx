import React from "react";

import { RegisterAuthForm } from "@/src/features/auth/components/RegisterAuthForm";
import { RegisterHeroSection } from "@/src/features/auth/components/RegisterHeroSection";
import { RegisterLoginFooter } from "@/src/features/auth/components/RegisterLoginFooter";
import { AuthGridScreenShell } from "@/src/features/auth/components/AuthGridScreenShell";

export default function RegisterScreen() {
  return (
    <AuthGridScreenShell>
      <RegisterHeroSection />
      <RegisterAuthForm />
      <RegisterLoginFooter />
    </AuthGridScreenShell>
  );
}
