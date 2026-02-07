import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";
import MatrixRain from "@/components/MatrixRain";
import MouseTrail from "@/components/MouseTrail";
import InteractiveTerminal from "@/components/InteractiveTerminal";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-retro",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://artemshkonda.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Artem Shkonda | Backend Developer",
    template: "%s | Artem Shkonda",
  },
  description:
    "Backend Developer specializing in Node.js, TypeScript, and scalable system architecture. 5+ years of experience building high-performance APIs and microservices.",
  keywords: [
    "Backend Developer",
    "Node.js",
    "TypeScript",
    "NestJS",
    "PostgreSQL",
    "API Development",
    "Microservices",
    "Kyiv",
    "Ukraine",
  ],
  authors: [{ name: "Artem Shkonda" }],
  creator: "Artem Shkonda",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Artem Shkonda",
    title: "Artem Shkonda | Backend Developer",
    description:
      "Backend Developer specializing in Node.js, TypeScript, and scalable system architecture.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Artem Shkonda - Backend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artem Shkonda | Backend Developer",
    description:
      "Backend Developer specializing in Node.js, TypeScript, and scalable system architecture.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${vt323.variable} font-sans crt flicker`}>
        {/* Matrix Rain Background */}
        <MatrixRain />

        {/* Mouse trail particles */}
        <MouseTrail />

        {/* Scanline effect */}
        <div className="scanline" />

        {children}

        {/* Interactive Terminal */}
        <InteractiveTerminal />
      </body>
    </html>
  );
}
