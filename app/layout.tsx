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
  title: "Will Essilfie | MBA '26",
  description:
    "I'm graduating from Columbia Business School in May. Send me your address and I'll mail you my graduation card.",
  openGraph: {
    title: "Will Essilfie | MBA '26",
    description:
      "I'm graduating from Columbia Business School in May. Send me your address and I'll mail you my graduation card.",
    images: [
      {
        url: "/postcardpics/postcard-13.jpg",
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
