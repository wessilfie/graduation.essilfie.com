import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Will's Graduation Card",
  description:
    "I'm graduating from CBS next month and to celebrate I'm doing a graduation card and I'd love to send you one.",
  openGraph: {
    title: "Will's Graduation Card",
    description:
      "I'm graduating from CBS next month and to celebrate I'm doing a graduation card and I'd love to send you one.",
    images: [
      {
        url: "/will.jpg",
        width: 1200,
        height: 630,
        alt: "Will's Graduation Card",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`h-full ${fraunces.variable} ${dmSans.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
