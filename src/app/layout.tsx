import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Synctip Demo",
  description: "Synctip demo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he">
      <body>{children}</body>
    </html>
  );
}
