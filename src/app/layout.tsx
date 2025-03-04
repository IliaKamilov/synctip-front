import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import { Synctip } from "@/components/Synctip";
import { ThemeModeScript } from "@/components/ThemeModeScript/ThemeModeScript";

const assistant = Assistant({
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
    <html lang="he" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body dir="rtl" className={`${assistant.className}`}>
        <Synctip>{children}</Synctip>
      </body>
    </html>
  );
}
