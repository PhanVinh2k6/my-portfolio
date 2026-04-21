import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phan Vinh | Full-Stack Developer",
  description: "Portfolio of Phan Vinh - IT Student @ ICTU 2026. Web Developer, AI Researcher, and Creative Problem Solver.",
  keywords: ["portfolio", "developer", "nextjs", "react", "typescript"],
  openGraph: {
    title: "Phan Vinh | Full-Stack Developer",
    description: "Portfolio of Phan Vinh - IT Student @ ICTU 2026",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#DC143C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.className} antialiased bg-neutral-950 text-neutral-50 selection:bg-red-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
