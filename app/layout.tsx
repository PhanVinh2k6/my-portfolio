import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phan Vinh | Creative Developer",
  description: "Portfolio của Phan Vinh - ICTU 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased selection:bg-[#5227ff]">{children}</body>
    </html>
  );
}