import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { AdMoneyProvider } from "@/lib/store";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Ad Money",
  description: "Find out, in dollars, if your Twitch ads are paying you or just annoying chat.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${grotesk.variable} antialiased`}>
        <AdMoneyProvider>{children}</AdMoneyProvider>
      </body>
    </html>
  );
}
