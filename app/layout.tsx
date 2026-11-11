import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: `${profile.name} · AI-native builder`,
  description:
    "Sudharsan S builds AI agents and backend systems. Mechanical engineering student at GCT Coimbatore, Siemens Scholar. Projects sync live from GitHub.",
  openGraph: {
    title: `${profile.name} · AI-native builder`,
    description: "I turn specs into shipped systems, with AI agents in the loop.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
