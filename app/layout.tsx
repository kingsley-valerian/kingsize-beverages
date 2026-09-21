import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kingsize-beverages.vercel.app"),

  title: {
    default: "KINGSIZE Beverages | Wholesale Drinks & Beverage Supply",
    template: "%s | KINGSIZE Beverages",
  },

  description:
    "KINGSIZE Beverages supplies soft drinks, water, energy drinks, malt drinks, juices, yogurts, milk and other beverages to retailers, businesses, hospitality teams and events.",

  keywords: [
    "beverage wholesaler Nigeria",
    "drinks wholesaler Nigeria",
    "beverage supplier Nigeria",
    "soft drinks wholesale Nigeria",
    "drinks supplier Nigeria",
    "wholesale beverages",
    "soft drinks supplier",
    "energy drinks wholesale",
    "milk and dairy supplier",
    "Hollandia wholesale Nigeria",
    "KINGSIZE Beverages",
  ],

  verification: {
    google: "fkPgq7FYUo-2A9xAZ7s6_UZOt7rhq3MSwEhTBbpf3BA",
  },

  openGraph: {
    title: "KINGSIZE Beverages | Wholesale Drinks & Beverage Supply",
    description:
      "Quality beverages supplied to retailers, businesses, hospitality teams and events.",
    url: "https://kingsize-beverages.vercel.app",
    siteName: "KINGSIZE Beverages",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JWX22NDN5F"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JWX22NDN5F');
          `}
        </Script>
      </head>

      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}