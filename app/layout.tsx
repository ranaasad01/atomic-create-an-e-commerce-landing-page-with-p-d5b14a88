import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luminary Shop — Modern E-Commerce",
  description:
    "Discover curated products at Luminary Shop. Premium quality, unbeatable prices, and a seamless shopping experience.",
  keywords: ["e-commerce", "shop", "products", "online store"],
  openGraph: {
    title: "Luminary Shop — Modern E-Commerce",
    description: "Discover curated products at Luminary Shop.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-gray-900 font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}