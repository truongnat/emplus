import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
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
    <html lang="en" className={appFont.variable}>
      <body>
        <main className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-5 py-5">
          {children}
        </main>
      </body>
    </html>
  );
}
