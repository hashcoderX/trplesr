import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Triple SR Travelers - Discover Sri Lanka's Magic",
  description: "Experience unforgettable journeys through Sri Lanka's culture, nature, and adventure. Expert guides, personalized service, and authentic local experiences.",
  keywords: "Sri Lanka itineraries, Sri Lanka travel, cultural itineraries, wildlife safari, beach holidays, adventure travel",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    title: "Triple SR Travelers - Discover Sri Lanka's Magic",
    description: "Experience unforgettable journeys through Sri Lanka's culture, nature, and adventure.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Triple SR Travelers',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/main_logo.png`,
        width: 1200,
        height: 630,
        alt: 'Triple SR Travelers',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Triple SR Travelers - Discover Sri Lanka's Magic",
    description: "Experience unforgettable journeys through Sri Lanka's culture, nature, and adventure.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/main_logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} ${poppins.variable} antialiased`}>
        <AuthProvider>
          <Navbar />
          {children}
          <ChatWidget />
          <JsonLd />
          <Analytics />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
