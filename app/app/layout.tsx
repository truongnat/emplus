import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const appFont = Nunito({
  subsets: ["latin"],
  variable: "--font-app",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Em+ PWA",
  description: "A focused relationship PWA for couples.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff7f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={appFont.variable}>
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
