import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo Rendering",
  description: "Next.js Rendering Strategies Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased min-h-screen">
        <main className="max-w-4xl mx-auto p-4 py-8">{children}</main>
      </body>
    </html>
  );
}