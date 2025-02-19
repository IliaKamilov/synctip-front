import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synctip",
  description:
    "Transparency for employees, efficiency for managers, insights for owners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he">
      <body dir="rtl" className={`${inter.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
