import type { Metadata } from "next";
import { Alegreya, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const brandSerif = Alegreya({
  display: "swap",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-brand-serif",
  weight: "700",
});

export const metadata: Metadata = {
  title: "NaturesLove | Premium Dried Fruits and Seeds",
  description:
    "A colorful rotating showcase for Nature's Love dried fruits, seeds, and natural snack products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${brandSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
