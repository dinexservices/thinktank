import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ThinkTank | The Premier Student Founder Ecosystem",
    template: "%s | ThinkTank"
  },
  description: "Pitch to investors, build your network, and launch your dream. The premier student founder ecosystem connecting students, startups, and investors.",
  keywords: ["startup", "student founders", "funding", "investors", "entrepreneurship", "campus", "incubator"],
  openGraph: {
    title: "ThinkTank | The Premier Student Founder Ecosystem",
    description: "Pitch to investors, build your network, and launch your dream.",
    type: 'website',
    locale: 'en_US',
    siteName: 'ThinkTank Campus',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ThinkTank | The Premier Student Founder Ecosystem",
    description: "Pitch to investors, build your network, and launch your dream.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        <Header />

        <div className="relative z-10">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
