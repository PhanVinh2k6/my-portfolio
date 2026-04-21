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
  themeColor: "#7C3AED",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth bg-background">
      <body className={`${inter.className} antialiased text-foreground selection:bg-accent selection:text-accent-foreground`}>
        {children}
      </body>
    </html>
  );
}
