import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist-sans", weight: "100 900" });

export const metadata: Metadata = {
  title: "RenderLab | Next.js Rendering Strategies",
  description: "Dashboard minh hoạ SSR, SSG, ISR và CSR trong Next.js 14.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body className={geistSans.variable}>{children}</body></html>;
}
