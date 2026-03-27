import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Send Will a Card — CBS MBA '26",
  description:
    "Will Essilfie is graduating from Columbia Business School in May 2026. Share your address so he can send you a graduation card.",
  openGraph: {
    title: "Send Will a Card — CBS MBA '26",
    description:
      "Will Essilfie is graduating from Columbia Business School in May 2026. Share your address so he can send you a graduation card.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
