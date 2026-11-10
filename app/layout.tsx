import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACM 2026 Digital Experience // Independent Community Platform Prototype",
  description:
    "Independent digital platform prototype and architectural concept for a student computing community web experience. Built with Next.js, React, and Tailwind CSS.",
  keywords: [
    "ACM 2026",
    "Digital Experience Prototype",
    "Computing Community",
    "Computer Science",
    "Next.js",
    "React",
    "Open Source",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
