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
  metadataBase: new URL("https://graduation.essilfie.com"),
  title: "Will's MBA Graduation Card",
  description:
    "I'm graduating from Columbia Business School in May. Send me your address and I'll mail you my graduation card.",
  authors: [{ name: "Will Essilfie" }],
  openGraph: {
    type: "website",
    url: "https://graduation.essilfie.com",
    siteName: "graduation.essilfie.com",
    title: "Will's MBA Graduation Card",
    description:
      "I'm graduating from Columbia Business School in May. Send me your address and I'll mail you my graduation card.",
    images: [
      {
        url: "https://graduation.essilfie.com/postcardpics/postcard-13.jpg",
        width: 1600,
        height: 1061,
        alt: "Will Essilfie's Graduation Card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will's MBA Graduation Card",
    description:
      "I'm graduating from Columbia Business School in May. Send me your address and I'll mail you my graduation card.",
    images: ["https://graduation.essilfie.com/postcardpics/postcard-13.jpg"],
  },
  other: {
    // LinkedIn requires name="image"
    image: "https://graduation.essilfie.com/postcardpics/postcard-13.jpg",
    // WhatsApp checks secure_url; all scrapers benefit from explicit type
    "og:image:secure_url": "https://graduation.essilfie.com/postcardpics/postcard-13.jpg",
    "og:image:type": "image/jpeg",
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
