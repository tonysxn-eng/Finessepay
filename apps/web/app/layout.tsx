import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "FinessePay";

export const metadata: Metadata = {
  title: {
    default: `${appName} — Stellar payments, local cash`,
    template: `%s · ${appName}`,
  },
  description:
    "Receive XLM, USDC, and USDT on Stellar. Convert to NGN, USD, EUR, or JPY. Testnet-first, open source.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
