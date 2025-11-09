import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ProjectsProvider } from "@/lib/projects-context";
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
  title: "Replic - AI Agent for X That Auto-Replies in Your Brand Voice",
  description: "Automate your social presence. Stay active, authentic, and on-brand — 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProjectsProvider>
          {children}
        </ProjectsProvider>
      </body>
    </html>
  );
}
