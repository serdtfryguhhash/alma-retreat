import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Alma Retreat Mallorca — Luxury Yoga & Pilates Retreats in Camp de Mar",
  description:
    "Escape to a breathtaking modern mansion in Mallorca for transformative yoga and pilates retreats. All-inclusive luxury with ocean views, gourmet plant-based cuisine, spa treatments, and world-class instruction.",
  keywords:
    "yoga retreat Mallorca, pilates retreat Spain, luxury wellness retreat, women's retreat Mallorca, yoga getaway, Camp de Mar retreat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans min-h-screen flex flex-col bg-[#FAF8F5] text-[#2D2A26] antialiased`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
