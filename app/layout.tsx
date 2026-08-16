import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Made For You — A birthday story",
  description: "A personal birthday story told through five little rooms.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
