import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Made For You — A birthday story",
  description: "A personal birthday story told through ten little rooms.",
  openGraph: {
    title: "A Little Birthday World — Made For You",
    description: "Ten little rooms. A thousand reasons to celebrate you.",
    images: ["https://these-a.vercel.app/og.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Little Birthday World — Made For You",
    description: "Ten little rooms. A thousand reasons to celebrate you.",
    images: ["https://these-a.vercel.app/og.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
