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
  title: "Will Essilfie's Graduation — Get a Card from Me",
  description:
    "I'm graduating from Columbia Business School next month! Drop your address and I'll send you a graduation card.",
  openGraph: {
    title: "Will Essilfie's Graduation — Get a Card from Me",
    description:
      "I'm graduating from Columbia Business School next month! Drop your address and I'll send you a graduation card.",
    images: [
      {
        url: "/will.jpg",
        width: 1200,
        height: 630,
        alt: "Will Essilfie's Graduation Card",
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
