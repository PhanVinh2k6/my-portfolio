import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://phanvinh.id.vn"),
  title: {
    default: "Phan Vinh | IT Student & Web Developer",
    template: "%s | Phan Vinh",
  },
  description:
    "Portfolio of Phan Ha Thai Vinh, an Information Technology student at ICTU focused on web development, software systems, and artificial intelligence.",
  keywords: [
    "Phan Vinh",
    "web developer",
    "IT student",
    "ICTU",
    "Next.js",
    "portfolio",
    "Thai Nguyen",
  ],
  authors: [{ name: "Phan Ha Thai Vinh" }],
  creator: "Phan Ha Thai Vinh",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Phan Vinh Portfolio",
    title: "Phan Vinh | IT Student & Web Developer",
    description:
      "Web development, software systems, and AI projects by Phan Ha Thai Vinh.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5ee",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
