import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-red-600 selection:text-white transition-colors duration-300`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
